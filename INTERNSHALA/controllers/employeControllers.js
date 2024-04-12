//callback function ko dekne ke liye
// Import karte hain catchAsyncErrors middleware ko

const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Employe = require("../models/employeModel");
const Internship =require("../models/internshipModel")
const Job =require("../models/jobModel")
const ErrorHandler=require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit=require("../utils/imagekit").initImageKit();
const path=require("path");
// studentModel ko import karte hain
// homepage endpoint ke liye callback function

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure Employe HomePage!" });
});

exports.currentEmploye=catchAsyncErrors(async (req, res, next) => {
    const employe=await Employe.findById(req.id).exec();
    res.json({employe });
}); 
 exports.employesignup = catchAsyncErrors(async (req, res, next) => {
    const employe = await new Employe(req.body).save();
    sendtoken(employe,201,res);
});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({ email: req.body.email }).select("+password").exec();

    if (!employe) {
        return next(
         new ErrorHandler("User not found with this email address", 404));
    }

    const isMatch = employe.comparepassword(req.body.password);

    if (!isMatch) {
        return next(new ErrorHandler("Wrong Credentials", 500));
    }
    sendtoken(employe,201,res);
    
});
/*
exports.employesignin = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Email and password are required", 400));
    }
    const employe = await Employe.findOne({ email }).select("+password").exec();
    if (!employe) {
        return next(new ErrorHandler("User not found with this email address", 404));
    }
    const isMatch = await employe.comparePassword(req.body.password);
     if (!isMatch) {
        return next(new ErrorHandler("Wrong credentials", 401));
    } 
    sendtoken(employe, 200, res);
});*/

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
    // Clear the "token" cookie
    res.clearCookie("token");
    res.json({ message: "Successfully signout!" });
});

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
     const employe=await Employe.findOne({email: req.body.email}).exec();
     if (!employe) {
        return next(
         new ErrorHandler("User not found with this email address", 404));
    };
    const url = `${req.protocol}://${req.get("host")}/Employe/forget-link/${employe._id}`;
      
    sendmail(req,res,next,url);
    employe.resetPasswordToken="1";
    await employe.save();
    res.json({employe,url});
});

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
    const employe=await Employe.findById(req.params.id).exec();
    if (!employe) {
       return next(
        new ErrorHandler("User not found with this email address", 404));
   };
   if(employe.resetPasswordToken == "1"){
    employe.resetPasswordToken="0";
    employe.password=req.body.password;
    await employe.save();
   
   } else{
    return next(
        new ErrorHandler("Invalid Reset Password Link! Please try again ", 500));
    };
   
    employe.password =req.body.password;
    await employe.save();
    res.status(200).json({
        message:"Password has been successfully Changed",
    });


});
exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
        const employe = await Employe.findById(req.params.id).exec();
        if (!employe) {
            return res.status(404).json({ message: "Employee not found" });
        }
        employe.password = req.body.password;
        await employe.save();
        sendtoken(employe, 201, res);
    });
    
exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findByIdAndUpdate(req.params.id,req.body).exec();
    res.status(200).json({
      success:"true",
      message:"employe updated successfully",
      Employe,
    })
});

exports.employeavatar= catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();
    const file=req.files.organizationlogo;
    const modifiedFileName =`resumebuilder-${Date.now()}${path.extname(file.name)}`
   
    if(employe.organizationlogo.fileId !==""){
        await imagekit.deleteFile(employe.organizationlogo.fileId);
    }
   
    const {fileId,url}=await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName,
    });
    employe.organizationlogo={fileId,url};
    await employe.save();
    res.status(200).json({
        success:true,
        message:"Profile updated",
    });

});

//-------INTERNSHIP MODEL -----------------------
exports.createinternship= catchAsyncErrors(async (req, res, next) => {
const employe = await Employe.findById(req.id).exec();
       // if (!employe) return res.status(404).json({ success: false, message: "Employee not found" });
        
        const internship = await new Internship(req.body);
        internship.employe=employe._id;
        employe.internships.push(internship._id);
        await internship.save();
        await employe.save();
        
        res.status(201).json({ success: true, internship });
});       

exports.readinternship= catchAsyncErrors(async (req, res, next) => {
    const{internships} = await Employe.findById(req.id)
    .populate("internships")
    .exec();
    res.status(200).json({success:true, internships});
});

exports.readsingleinternship= catchAsyncErrors(async (req, res, next) => {
    const internship = await  Internship.findById(req.params.id).exec();
    if(!internship) return new ErrorHandler("Internship Not Found");
    res.status(201).json({success:true, internship});
});

//----------------JOBS MODEL -----------------------
exports.createjobs= catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
           // if (!employe) return res.status(404).json({ success: false, message: "Employee not found" });
            const job = await new Job(req.body);
            job.employe=employe._id;
            employe.jobs.push(job._id);
            await job.save();
            await employe.save();
            res.status(201).json({ success: true, job });
    });    

exports.readjobs = catchAsyncErrors(async (req, res, next) => {
        const {jobs} = await Employe.findById(req.id).populate('jobs').exec();
        res.status(200).json({ success: true,jobs });
    });
   
exports.readsinglejobs = catchAsyncErrors(async (req, res, next) => {
        const job = await Job.findById(req.params.id).exec();
         res.status(200).json({ success: true, job });
    });    






