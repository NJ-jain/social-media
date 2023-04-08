const mongoose = require("mongoose")

const postsModel = new mongoose.Schema({
    Title : {
        type : "String",
        required : [true , "data is required"],
        // minLength : [4 ,"name feild atleast  4 chacter"]
    },
    author : {
        type : mongoose.Schema.Types.ObjectId , ref : 'user'
    } ,
    Description : {
        type : "String",
        required : [true , "data is required"],
        // minLength : [4 ,"name feild atleast  4 chacter"]
    },
      like : [{  type : mongoose.Schema.Types.ObjectId , ref : 'user'}],
    comment : [{  type : mongoose.Schema.Types.ObjectId , ref : 'comment'}] 
}, {timestamps : true})


const posts = mongoose.model("posts" , postsModel)
// validator is used to check a string as per our conditions 

module.exports = posts;



// jsonwebtoken expresass-session