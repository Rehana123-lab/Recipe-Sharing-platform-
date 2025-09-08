const express=require('express')
const router=express.Router()
const { authenticateJWT}=require('../utility/auth')

router.get('/data',authenticateJWT,(req,res)=>{
    res.json({message:'This is protected data',userId:req.user.userId})
})
module.exports=router