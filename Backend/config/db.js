 const mongoose = require("mongoose");
 const connectDB = async() => {

    try{
        await mongoose.connect("mongodb://localhost:27017/Ecommerce")
        console.log("Mongo DB connected successfully")
    }catch(error){
        console.log("MongoDB connection failed")
    }
    
 }

 module.exports = connectDB;
 
