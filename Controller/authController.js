
const pool = require('./mysqlConnection')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.sign_up=(req,res)=>{
let name=req.body.fullname
let mobileNo=req.body.mobileNo
let email=req.body.email
let accountCategory_id=req.body.accountCategory_id
if(mobileNo!="" && mobileNo!=undefined){
    let sql="select * from users where mobileNo='"+mobileNo+"'"
pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result!=""){
        res.status(400).json({messege:"user alredy exist",status:false})
    }else{
        let random_otp=Math.floor(Math.random()*9000)
        let sql="select * from users where otp='"+random_otp+"'"
        pool.query(sql,(err,result)=>{
            if(err) throw err;
            if(result!=""){
                let random_otp2=Math.floor(Math.random()*9000)
                let sql="insert into users (name,mobileNo,email,accountCategory_id,otp) values ('"+name+"','"+mobileNo+"','"+email+"','"+accountCategory_id+"','"+random_otp2+"')"
               pool.query(sql,(err,result)=>{
                   let access_secreate_key=process.env.access_token_s_key
                   if(err) throw err;
                   let access_token=jwt.sign({user_id:result.insertId},access_secreate_key,{expiresIn:"1d"})
                   let response={
                       otp:random_otp2,
                       access_t:access_token
                   }
                   res.status(200).json({status:true,redirect:"http://localhost:880/api/otp/verify",data:response})
                })
                
            }else{  
               let sql="insert into users (name,mobileNo,email,accountCategory_id,otp) values ('"+name+"','"+mobileNo+"','"+email+"','"+accountCategory_id+"','"+random_otp+"')"
               pool.query(sql,(err,result)=>{
                   let access_secreate_key=process.env.access_token_s_key
                   if(err) throw err;
                   let access_token=jwt.sign({user_id:result.insertId},access_secreate_key,{expiresIn:"1d"})
                   let response={
                       otp:random_otp,
                       access_t:access_token
                   }
                   res.status(200).json({status:true,redirect:"http://localhost:880/api/otp/verify",data:response,messege:"else"})
                })
            }
         })
    }
})
}else{
    res.status(400).json({messege:"mobileNo is required",status:false})
}
}


exports.otp_verify = (req, res) => {
    let user_id = req.user_id
    let sql = "select * from users where id='" + user_id + "'"
    pool.query(sql, (err, result) => {
        if (err) throw err;
        if (result != "") {
            let otp_verify = req.body.otp
            if (otp_verify && otp_verify != undefined) {
                let sql = "select * from users where id='"+user_id+"' and mobileNo='" +result[0].mobileNo+ "' and otp='" + otp_verify + "'"
                pool.query(sql, (err, result) => {
                    if (err) throw err;
                    if (result != "") {
                        let response = {
                            messege: "set your password",
                            redirect_page: "http://localhost:880/api/set/password"
                        }
                        let sql="update users set otp='"+null+"' where id='"+result[0].id+"'"
                        pool.query(sql,(err,result)=>{
                            if (err) throw err;
                        })
                        res.status(200).json({ data: response, status: true })
                    } else {
                        res.status(400).json({ messege: "invalid Otp", status: false })
                    }
                })
            } else {
                res.status(400).json({ messege: "otp required", status: false })
            }
        } else {
            res.status(400).json({ messege: "mismatch information", status: false })
        }
    })


}

exports.set_password=(req,res)=>{
    let user_id=req.user_id
    let password=req.body.password
    let confirm_password=req.body.confirm_password
    if((password!=""&&password!=undefined) && (confirm_password!=""&&confirm_password!=undefined)){
        if(password == confirm_password){
            let salt=bcrypt.genSaltSync(10)
            let hashpassword=bcrypt.hashSync(password,salt)
            let sql="update users set password='"+hashpassword+"' where id='"+user_id+"'"
            pool.query(sql,(err,result)=>{
            if(err) throw err;
            res.status(200).json({messege:"password set successful",status:true})
        })
        }else{
            res.status(400).json({messege:"password and confirm password not match"})
        }
    }else{
        res.status(400).json({messege:"password is required"})
    }
    
    
}
exports.user_login=(req,res)=>{
  let {email,password}=req.body
  if((email!=""&& email!=undefined)&&(password!=""&& password!=undefined)){
    let sql="select * from users where email='"+email+"'"
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result!=""){
            let p=bcrypt.compareSync(password,result[0].password)
            if(p==true){
                let access_secreate_key=process.env.access_token_s_key
                let access_token=jwt.sign({user_id:result[0].id},access_secreate_key,{expiresIn:"1d"})
                res.status(200).json({data:access_token,messege:"user login succesful",status:true})
            }else{
                res.status(400).json({messege:"email and password wrong"})
            }
        }else{
            res.status(400).json({messege:"user not exist",status:false})
        }
    })
  }else{
    res.status(400).json({messege:"please fill field"})
  }
}