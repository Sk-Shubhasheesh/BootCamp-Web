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
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware")

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
app.post("/signup", (req, res) => {
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

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userExists = USERS.find(u => u.username === username & u.password === password);
    if (!userExists) {
        res.status(403).json({
            message: "Incorred credentials"
        })
    }
    // if user exits create jwt for the user
    const token = jwt.sign({
        userId: userExists.id
    }, "atlasiation123");

    res.json({
        token
    })

})


// AUTHENTICATED ROUTE - MIDDLEWARE
app.post("/organization", authMiddleware, (req, res) => {
    const userId = req.userId;
    ORGANIZATIONS.push({
        id: ORGANIZATION_ID++,
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    })
    res.json({
        message: "Org created",
        id: ORGANIZATION_ID - 1
    })

})

app.post("/add-member-to-organization", authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memerUserUsername = req.body.memerUserUsername;
    const organization = ORGANIZATIONS.find(org => org.id === organizationId)
    if (!organization || organization.admin !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })
        return
    }
    const memberUser = USERS.find(u => u.username === memerUserUsername);

    if (!memberUser) {
        res.status(411).json({
            message: "No user with this username exists in our db"
        })
        return
    }

    organization.members.push(memberUser.id);

    res.json({
        message: "New member added!"
    })
})

app.post("/board", authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const boardTitle = req.body.boardTitle;
    // update here from filter to find
    const organization = ORGANIZATIONS.find(org => org.id === organizationId);
    if (!organization || organization.admin != userId) {
        return res.status(404).json({
            message: "eighter the org does not exist or you are not the admin of the org"
        })
    }

    BOARDS.push({
        id: BOARD_ID++,
        title: boardTitle,
        organizationId: organizationId
    })
    return res.status(201).json({
        message: "board is created!",
        id: BOARD_ID - 1
    })
})

app.post("/issue", authMiddleware, (req, res) => {
    const userId = req.userId;
    const boardId = req.body.boardId;
    const issueTitle = req.body.title;

    const board = BOARDS.find(board => board.id === boardId)
    if (!board) {
        return res.status(404).json({
            message: "No board with this id exists in our db"
        })
    }
    ISSUES.push({
        id: ISSUES_ID++,
        title: issueTitle,
        board: board.id,
        status: "UP_NEXT"
    })
    res.status(201).json({
        message: "issue created",
        id: ISSUES_ID - 1
    })

})

// READ - GET endpoints
app.get("/organization", authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = parseInt(req.query.organizationId); // "1"

    const organization = ORGANIZATIONS.find(org => org.id === organizationId);
    if (!organization || organization.admin !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })
        return
    }

    res.json({
        organization: {
            ...organization,
            members: organization.members.map(memberId => {
                const user = USERS.find(user => user.id === memberId);
                return {
                    id: user.id,
                    username: user.username
                }
            })
        }
    })
})

app.get("/boards", authMiddleware, (req, res) => {
    const userId = req.body.userId;
    const organizationId = parseInt(req.query.organizationId);

    const organization = ORGANIZATIONS.find(org => org.id === organizationId);

    if (!organization || organization.admin !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })
        return
    }

    const boards = BOARDS.filter(board => board.organizationId === organization.id);

    res.status(200).json({
        boards
    })

})

app.get("/issues", (req, res) => {

})

app.get("/members", (req, res) => {

})

// UPDATE
app.put("/issues", (req, res) => {

})

// DELETE Endpoint
app.delete("/members", authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserUsername = req.body.memberUserUsername;

    const organization = ORGANIZATIONS.find(org => org.id === organizationId);

    if (!organization || organization.admin !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })
    }

    const memberUser = USERS.find(u => u.username === memberUserUsername);

    if (!memberUser) {
        res.status(411).json({
            message: "No user with this username exists in our db"
        })
    }
    organization.members = organization.members.filter(
        id => id !== memberUser.id
    );

    res.json({
        message: "member deleted!"
    })
})

app.listen(3000);



