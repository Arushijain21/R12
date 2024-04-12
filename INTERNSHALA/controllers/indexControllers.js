//callback function ko dekne ke liye
// Import karte hain catchAsyncErrors middleware ko

const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const ErrorHandler=require("../utils/ErrorHandler");
const student = require("../models/studentModel");
const Internship =require("../models/internshipModel");
const Job =require("../models/jobModel")
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit=require("../utils/imagekit").initImageKit();
const path=require("path");
// studentModel ko import karte hain
// homepage endpoint ke liye callback function
exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure HomePage!" });
});

exports.currentUser=catchAsyncErrors(async (req, res, next) => {
    const Student=await student.findById(req.id).exec();
    res.json({ Student });
});

// studentsignup endpoint ke liye callback function
    exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    // Naye student ka instance banakar save karte hain
    const Student = await new student(req.body).save();
    // Naye student ka data bhejte hain, sath hi status code 201 (Created) bhejte hain
   // res.status(201).json(Student);
   sendtoken(Student,201,res);
});


exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const Student = await student.findOne({ email: req.body.email }).select("+password").exec();

    if (!Student) {
        return next(
         new ErrorHandler("User not found with this email address", 404));
    }

    const isMatch = Student.comparepassword(req.body.password);

    if (!isMatch) {
        return next(new ErrorHandler("Wrong Credentials", 500));
    }
    sendtoken(Student,201,res);
    
});
exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
    // Clear the "token" cookie
    res.clearCookie("token");
    res.json({ message: "Successfully signout!" });
});

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
     const Student=await student.findOne({email: req.body.email}).exec();
     if (!Student) {
        return next(
         new ErrorHandler("User not found with this email address", 404));
    };
    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${Student._id}`;
      
    sendmail(req,res,next,url);
    Student.resetPasswordToken="1";
    await Student.save();
    res.json({Student,url});
});

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
    const Student=await student.findById(req.params.id).exec();
    if (!Student) {
       return next(
        new ErrorHandler("User not found with this email address", 404));
   };
   if(Student.resetPasswordToken == "1"){
    Student.resetPasswordToken="0";
    Student.password=req.body.password;
    await Student.save();
   
   } else{
    return next(
        new ErrorHandler("Invalid Reset Password Link! Please try again ", 500));
    };
   
    Student.password =req.body.password;
    await Student.save();
    res.status(200).json({
        message:"Password has been successfully Changed",
    });


});

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
    const Student=await student.findById(req.params.id).exec();
    Student.password =req.body.password;
    await Student.save();
    sendtoken(Student,201,res);


});

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
    const Student = await student.findByIdAndUpdate(req.params.id,req.body).exec();
    res.status(200).json({
      success:"true",
      message:"Student updated successfully",
      student,
    })
});

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
    const Student = await student.findById(req.params.id).exec();
    const file=req.files.avatar;
    const modifiedFileName =`resumebuilder-${Date.now()}${path.extname(file.name)}`
   
    if(Student.avatar.fileId !==""){
        await imagekit.deleteFile(Student.avatar.fileId);
    }
   
    const {fileId,url}=await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName,
    });
    Student.avatar={fileId,url};
    await Student.save();
    res.status(200).json({
        success:true,
        message:"Profile updated",
    });

});

//----------------APPLY INTERNSHIP---------------------------
exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
    const Student = await student.findById(req.id).exec();
    const internship = await Internship.findById(req.params.internshipid).exec();
    Student.internships.push(internship._id);
    internship.students.push(Student._id);
    await Student.save();
    await internship.save();
    res.json({ Student,internship });
});

//----------------APPLY JOB --------------------------------------
exports.applyjob = catchAsyncErrors(async (req, res, next) => {
       const Student = await student.findById(req.id).exec(); 
        const job = await Job.findById(req.params.jobid).exec(); 
        Student.jobs.push(job._id);
        job.students.push(Student._id);
        await Student.save();
        await job.save();
        res.json({ Student, job });
    
});
