const express=require('express')
const router=express.Router()
const{register,login,adminLogin}=require('../controller/authControllers')



router.post('/adminLogin', adminLogin);  
router.post('/register',register)
router.post('/login',login)
module.exports=router

