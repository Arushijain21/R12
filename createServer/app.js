const express = require("express")
const app = express();
const dotenv = require("dotenv")
dotenv.config({path:"./.env"})
// const PORT = process.env.PORT
require("./models/dbconfig").dbconnection(process.env.MONGO_URL) 

//routes
const userRouter = require("./routers/userRouters")

// body parser 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//logger
const logger = require("morgan");
app.use(logger("tiny"))

app.use("/api/user", userRouter)

app.all("*", (req, res, next)=>{ 
    res.status(404).json({sucess:true, message:`${req.url} route not found`})
})

//server
app.listen(process.env.PORT, ()=>{
    console.log(`this server is running on the port ${process.env.PORT}`)
})