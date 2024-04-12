require("dotenv").config({path:"./.env"});
const express = require("express");
const app = express();

//db connection
require("./models/database").connectDatabase();

//logger =morgan
const logger=require("morgan");
app.use(logger("tiny"));
//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false }));
//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(cookieparser());
//express file-uploade
const fileupload = require("express-fileupload");
app.use(fileupload());
//routes
app.use("/user", require("./routes/indexRoute"));
app.use("/resume",require("./routes/resumeRoute"));
app.use("/employe",require("./routes/employeRoute"));

//error handling  //*=all
const ErrorHandler = require("./utils/ErrorHandler");
const { genetatedErrors } = require("./middlewares/error");
app.all("*", (req,res,next) => {
      next(new ErrorHandler(`Requested Url Not Found ${req.url}`,404));
});
app.use(genetatedErrors);

//server
app.listen(process.env.PORT, ()=>{
    console.log(`this server is running on the port ${process.env.PORT}`)})

