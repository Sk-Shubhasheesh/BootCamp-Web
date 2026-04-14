// db looklike its dummy data

/*
const users = [{
    id:1,
    userName:"Shubhasheesh",
    password: "13123"
}, {
    id:2,
    userName:"raman",
    password: "13123"
}];

const organizations = [{
    id: 1,
    title: "100xdevs",
    description: "Learning coding platform",
    admin:1,
    members: [2]
}, {
    id: 2,
    title: "ramans org",
    description: "Experimenting",
    admin:1,
    members: []
}];

const boards = [{
    id:1,
    title: "100x school website frontend",
    organizationId: 1
}];

const issues = [{
    id:1,
    title: "Add dark mode",
    boardId: 1
}, {
    id:2,
    title: "Allow admine to create more courses",
    boardId: 1
}]
    */

const e = require('express');
const express = require('express');
const jwt = require("jsonwebtoken");

let USERS_ID = 1;
let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUES_ID = 1;

const USERS = [];

const ORGANIZATIONS = [];

const BOARDS = [];

const ISSUES = [];


const app = express();
app.use(express.json())

// CREATE End Point
app.post("/signup", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(u => u.username === username);
    if (userExists) {
        res.status(411).json({
            message: "User with this username already exists"
        })
        return;
    }

    USERS.push({
        username,
        password,
        id: USERS_ID++
    })

    res.json({
        message: "You have signed up successfully"
    })

})

app.post("/signin", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const userExists = USERS.find(u=>u.username === username & u.password === password);
    if(!userExists){
        res.status(403).json({
            message: "Incorred credentials"
        })
    }
    // if user exits create jwt for the user
    const token  = jwt.sign({
        userId: userExists.id
    }, "atlasiation123");

    res.json({
        token
    })




})

app.post("/organization", (req, res)=>{

})

app.post("/add-member-to-organization", (req, res)=>{

})

app.post("/board", (req, res)=>{

})

app.post("/issue", (req, res)=>{

})

// READ - GET endpoints
app.get("/boards", (req, res)=>{

})

app.get("/issues", (req, res)=>{

})

app.get("/members", (req, res)=>{

})

// UPDATE
app.put("/issues", (req, res) => {

})

// DELETE Endpoint
app.delete("/members", (req, res)=>{

})









app.listen(3000);



