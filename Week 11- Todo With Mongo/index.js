// Initiaize simple Express App
const express = require('express');
const { authMiddleware } = require('./middleware');
const jwt = require('jsonwebtoken');

const { todoModel, userModel } = require("./models");

const app = express();
app.use(express.json());


app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await userModel.findOne({
        username: username,
        password: password
    })
    if (existingUser) {
        res.status(403).json({
            message: "User with this username already exists"
        })
        return
    }
    const newUser = await userModel.create({
        username: username,
        password: password
    })
    res.json({
        id: newUser._id
    })

})

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await userModel.findOne({
        username: username,
        password: password
    })
    if (!existingUser) {
        res.status(403).json({
            message: "Incorrect credentials"
        })
        return
    }
    const token = jwt.sign({
        userId: existingUser.id
    }, "123123")
    res.json({
        token
    })

})

app.post("/todo", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;
    const token = req.headers.token;
    if (!token) {
        res.status(403).json({
            message: "Incorrect credentials"
        })
        return

    }

    const todo = await todoModel.create({
        userId,
        title,
        description
    })
    res.json({
        message: "Todo Created",
        Todo: todo

    })


})

app.get("/todo", authMiddleware, (req, res) => {
    const userId = req.userId;

})







app.listen(3000);

