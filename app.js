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

    app.post("/adminsignin",(req,res)=>{
        let input=req.body
        let result=LoginModel.find({username:input.username}).then(
            (response)=>{
                if (response.length>0) {
                    const validator=bcrypt.compareSync(input.password,response[0].password)
                    if(validator)
                    {
                        jwt.sign({email:input.username},"rescue-app",{expiresIn:"1d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status":"Token Creation Failed"})
    
                            } else {
                                res.json({"status":"success","token":token})
    
                            }
                        })
                    }else
                    {
                        res.json({"status":"Wrong Password"})
                    }
                } else {
                    res.json({"status":"Invalid Authentication"}) 
                }
            }
        ).catch()
    })

  
app.listen(8080,()=>{
    console.log("server started")
})
