const {Admin}= require("../db")



// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const password= req.headers.password
    const username= req.headers.username
   Admin.findOne({
    username:username ,
    password:password
   }).then(function(value){
    if(value){
        next()
    }
    else {
        res.status(403).json({msg:"admin does not exist"})
    }
   })

}

module.exports = adminMiddleware;