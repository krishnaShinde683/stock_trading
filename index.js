
const express=require('express')
const app=express();
require('dotenv').config();
const bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
const routes=require('./Routes/route')
app.use('/api',routes)
let port=process.env.port||820
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})