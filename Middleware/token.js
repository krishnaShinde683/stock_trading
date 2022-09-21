const jwt =require('jsonwebtoken')
const pool=require('../Controller/mysqlConnection')

exports.middleware=(req,res,next)=>{
    try {
        let access_token=req.body.token||req.query.token||req.headers.authorization
        if(access_token && access_token!=undefined){
            let access_secreate_key=process.env.access_token_s_key
            let token_verify=jwt.verify(access_token,access_secreate_key)
            if(token_verify.user_id != undefined){
                let sql="select * from users where id='"+token_verify.user_id+"'"
                pool.query(sql,(err,result)=>{
                    if(err) throw err;
                    if(result!=""){
                        req.user_id=result[0].id
                        next()
                    }else{
                        res.status(400).json({status:"failed",messege:"user not found"})
                    }  
                })  
        }
        }else{
            res.status(200).json({messege:"token not found",status:false})
        }
    } catch (error) {
        res.status(400).json({messege:"token invalid"})
    }
}