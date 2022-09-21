const pool=require("./mysqlConnection")

exports.account_type=(req,res)=>{
    let type=req.body.type
    let sql="insert into accountcategory (type) values ('"+type+"')"
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({messege:"accout type inserted",status:true})
    })
}