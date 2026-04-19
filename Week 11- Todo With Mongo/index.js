// Initiaize simple Express App
const express = require('express');
const { authMiddleware } = require('./middleware');
const jwt = require('jsonwebtoken');

const { todoModel,userModel } = require("./models");

const app = express();
app.use(express.json());


app.post("/signup", async(req, res)=>{
    const username =req.body.username;
    const password = req.body.password;
    const existingUser = await userModel.findOne({
        username:username,
        password: password
    })
    if(existingUser){
        res.status(403).json({
           message: "User with this username already exists" 
        })
        return
    }
    const newUser = await userModel.create({
        username: username,
        password:password
    })
    res.json({
        id: newUser._id
    })

})

app.post("/signin", (req, res)=>{

})

app.post("/todo",authMiddleware, (req, res)=>{
    const userId = req.userId;
    
})

app.get("/todo",authMiddleware, (req, res)=>{
    const userId = req.userId;

})







app.listen(3000);

