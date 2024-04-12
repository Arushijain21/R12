const User = require("../models/userModel")

exports.home =  function(req, res ,next){
    res.status(200).json({sucess: true, message: "hello"})
}

exports.usercreate =  function(req, res ,next){
    try{
      const newuser = new User(req.body)
      res.status(201).json({sucess: true, user: newuser})
    } catch(error){
      res.status(500).json({sucess: false, message: error})
    }
      
    }