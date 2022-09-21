const mysql=require('mysql')
const pool=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:process.env.database,
    password:""
})
pool.connect((err)=>{
    if(err) throw err;
    console.log("connection established")
})

module.exports=pool;