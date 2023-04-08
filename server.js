const express = require("express");
const session = require("express-session")
const cookieParser = require("cookie-parser")
require("dotenv").config({port : ".env"})
const app = express();
// const PORT = process.env.PORT
const indexRoute = require("./routes/indexRoute")

// database
require("./models/database").dataconnection();

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(session({
    resave : false , 
    saveUninitialized : false ,
    secret : "jeubf",
}))

// to connect react and node cors used
app.use(require("cors")({ origin : "https://social-media-atul-singh.netlify.app/" ,
    credentials : true  
}))
app.use("/" , indexRoute)

// app.listen(PORT , ()=> console.log(`server is runnig on port : ${PORT}`));
if (process.env.API_PORT) {
    app.listen(process.env.API_PORT);
}