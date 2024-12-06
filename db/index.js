const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://priyankvashisht2:opUGbKrGKtBfb3K1@cluster0.osniy.mongodb.net/course-selling-app');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password: String,
    purchasedCourses:[{                      //an array of purchased courses, it saves a ref from Course table 
      type: mongoose.Schema.Types.ObjectId,
      ref:'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    imageLink:String,
    price:Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}