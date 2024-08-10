const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require ("bcrypt")
const jwt = require("jsonwebtoken")
const LoginModel = require("./models/admin")
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://snehaip:sneha2020@cluster0.swl0hmq.mongodb.net/rescuedb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/adminsignup",(req,res)=>{
    let input = req.body
    let hashedpassword = bcrypt.hashSync(input.password,10)
    //console.log(hashedpassword)
    input.password=hashedpassword
    console.log(input)
    
    let result = new LoginModel(input)
    result.save()
    res.json({"status":"success"})
    
    })
  
app.listen(8080,()=>{
    console.log("server started")
})
