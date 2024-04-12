exports.genetatedErrors = (err,req,res,next) =>{
        const statusCode =err.statusCode || 500;
 
        //message error ko show karn eke liye
     if (err.name === "MongoServerError" && err.message.includes
     ("E11000 duplicate key")
       ){
      err.message="User/Student with this email address already exits";
     }

        res.status(statusCode).json({
            message:err.message,
            errName:err.name,
          // stack:err.stack,  //bad error in brief
        })
};