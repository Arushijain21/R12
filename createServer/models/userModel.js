const mongoose = require("mongoose")

const userModel =  new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
        required:[true, "username is required"],
        minLength:[3, "username must be ateast 3 charachter"]
    
    },
    email:{
        type:String,
        lowercase:true,
        required:[true, "email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        
    
    },
    password:{
        type:String,
        trim:true,
        unique:true,
        required:[true, "username is required"],
        minLength:[8, "username must be at least 8 charachter"],
        maxLength:[15, "username must be at most 15 charachter"]
    
    },
}, timestamps=true)

const user = mongoose.model("user", userModel)

module.exports = user