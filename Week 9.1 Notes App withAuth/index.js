const { log } = require("console");
const express = require("express");
const jwt = require('jsonwebtoken');

const path = require("path");
const app = express();

app.use(express.json());

const notes = []; // This is bad -- eventually we'll learn about databases (mongodb, postgres, mysql)

// array of object looks like[{username:"sk", password:"123"},  {username:"pk", password:"1293"}]
const users = [];
console.log(users);

app.post("/signup",function(req, res){
    const username = req.body.username;
    const password = req.body.password
    const userExists  = users.find(user =>user.name = username);
    if(userExists){
        return res.status(403).json({
            message:"User with this alredy exists"
        })
    }
    users.push({
        username:username,
        password: password
    })

    res.json({
        message: "You have signed up"
    })

    
})



app.post("/signin", function(req, res){
    const username  = req.body.username;
    const password  = req.body.password;
    // check user and password exist or not
    const userExist  = users.find(user=>user.username==username && user.password==password);
    if(!userExist){
        res.status(403).json({
            message: "Incorrect Credentials"
        })
        return;
    }
    //jwt
    const token = jwt.sign({
        username:username
    }, "shubh123");
    res.json({
        token:token
    })

})


// POST - Create a note - AUTHENTICATED ENDPOINT
app.post("/notes", function(req, res) {
    // check if they have sent the right header. extract who this is user is from the header.
    const token = req.headers.token;
    if(!token){
        res.status(403).send({
            message: "You are not logged in"
        })
        return;
    }
    const decoded = jwt.verify(token, "shubh123");
    const username = decoded.username;
    if(!username){
        res.status(403).json({
            message: "malformed token"
        })
        return;
    }

    const note = req.body.note;
    notes.push({note, username});

    res.json({
        message: "Done!"
    })
})

// GET - get all my notes  - AUTHENTICATED ENDPOINT
app.get("/notes", function(req, res) {
const token = req.headers.token;
    if(!token){
        res.status(403).send({
            message: "You are not logged in"
        })
        return;
    }
    const decoded = jwt.verify(token, "shubh123");
    const username = decoded.username;
    if(!username){
        res.status(403).json({
            message: "malformed token"
        })
        return;
    }



    const userNotes = notes.filter(note => note.username == username);
    res.json({
        notes: userNotes
    })
})

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});
app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "frontend", "signup.html"));
});
app.get("/signin", function(req, res) {
    res.sendFile(path.join(__dirname, "frontend", "signin.html"));
});




app.listen(3000);

