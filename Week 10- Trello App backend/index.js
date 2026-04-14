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

const express = require('express');

const app = express();

// CREATE End Point
app.post("/signup", (req, res)=>{

})

app.post("/signin", (req, res)=>{

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



