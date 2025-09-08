

require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()

// Middleware
app.use(express.json())
app.use(cors())

const loginrouter=require('./router/loginrouter')

app.use('/router',loginrouter)
const recipeRoutes = require("./router/Reciperouter");
app.use("/recipes", recipeRoutes);

const userRoutes = require("./router/Userrouter");
app.use("/users", userRoutes);







mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to mongodb")
})
.catch((err)=>console.log(err))

const env=process.env
const port=env.PORT ||3001



const protectedRoutes = require('./router/Protected');
app.use('/protected',protectedRoutes)


app.get('/',(req,res)=>{
    res.send("hai")
})

app.post('/',(req,res)=>{
    res.send("hellooo")
})
app.listen(env.PORT,()=>{
    console.log("server runnig",env.PORT)
})