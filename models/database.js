const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

exports.dataconnection = async ()=>
{
    try {
        await mongoose.connect("mongodb+srv://chatapp:namanjain@cluster0.yewz6tl.mongodb.net/?retryWrites=true&w=majority");
        console.log("database connected!")
    } catch (error) {
        console.log(error.message)
    }
}