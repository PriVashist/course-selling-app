const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin}=require('../db') //if not mentioned, it refers index.js
const router = Router();
const {Course}=require('../db')

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username= req.body.username
    const password= req.body.password
   await Admin.create({
        username:username,
        password:password       //checks if a user with this username already exists

    })
    res.json({
        msg:"Admin created successfully"
    })
});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    // Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
//   Output: { message: 'Course created successfully', courseId: "new course id" }
    
    const title=req.body.title
    const description=req.body.description
    const imageLink=req.body.imageLink
    const price=req.body.price

  const newCourse= await Course.create({
    title,         //if key and value are same don't repeat it , i.e. title:title not required
    description,
    imageLink,
    price
   })



   res.json({msg:"course created successfully",
          courseId:newCourse._id
   })



});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    // Course.find({})
    // .then(function(response){   //click response in parameters to check what the funct. passes when the promise is resolved
    //     res.json({
    //         courses:response
    //     })
    // })


    const response = await Course.find({})
      
        res.json({
            courses:response   //hover over response to see that an array will be returned
        })
    




});

module.exports = router;