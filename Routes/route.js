const express=require('express')
const routes=express.Router();
const t_verify=require('../Middleware/token')

const authcontroller=require('../Controller/authController')
const accountcontroller=require('../Controller/accountController')

routes.post('/account/insert',accountcontroller.account_type)
routes.post('/user/sign/up',authcontroller.sign_up)
routes.post('/otp/verify',t_verify.middleware,authcontroller.otp_verify)
routes.post('/set/password',t_verify.middleware,authcontroller.set_password)
routes.post('/user/login',authcontroller.user_login)

module.exports=routes