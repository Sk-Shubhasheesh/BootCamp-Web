const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next){
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Token not provided"
        });
    }
    const decoded = jwt.verify(token, "123123")
    if(decoded.userId){
        req.userId = decoded.userId;
        next()
    } else{
        res.status(403).json({
            message: "Token Invalid or User Not found"
        })
    }

}
module.exports = {
    authMiddleware:authMiddleware
}
