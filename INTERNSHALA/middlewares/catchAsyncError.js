//const { Promise } = require("mongoose")

exports.catchAsyncErrors =(func) => (req,res,next) =>{
    Promise.resolve(func(req,res,next)).catch(next);
}