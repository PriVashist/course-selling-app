const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {Course,User}=require('../db')
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username= req.body.username
    const password= req.body.password
    await User.create({
        username,    //key and value are same hence no need to write in lengthy way
        password
    })
    res.json({
        msg:"user created successfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({isPublished:"true"})
      
    res.json({
        courses:response   //hover over response to see that an array will be returned
    })


});

router.post('/courses/:courseId', userMiddleware,async  (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username=req.headers.username
    try{
    await User.updateOne({
        username:username},
        {
            "$push":{
                purchasedCourses: courseId
            }
 })
             res.json({
                message:"course purchased successfully"
             })
            }
            catch(e){
                console.log(e)
            }

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
   const user=await User.findOne({
        username:req.headers.username

    })
    console.log(user.purchasedCourses)
   const courses= await Course.find({
    _id:{
        "$in":user.purchasedCourses
    }// $in is used to query the db and courses 
   }) 
   
    res.json({
        courses:courses
    })

});

module.exports = router