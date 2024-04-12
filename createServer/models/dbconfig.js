const mongoose = require("mongoose")
 
//db connection
exports.dbconnection = async (a)=> {
    try{
        mongoose.connect(a)
        console.log("connection establish")
    } catch(error){
        console.log(error.message)

    }
}