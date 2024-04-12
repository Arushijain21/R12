const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const ErrorHandler=require("../utils/ErrorHandler");
const student = require("../models/studentModel");
const { v4: uuidv4 } = require('uuid');

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const {resume} = await student.findById(req.id).exec();
    res.json({ message: "Secure Resume Page!", resume });
});

//-------------------------------Education---------------------------------------------------------------
exports.addeducation = catchAsyncErrors(async (req, res, next) => {
    const Student= await student.findById(req.id).exec();
    Student.resume.education.push({...req.body, id:uuidv4() });
    await Student.save();
    res.json({ message: "Education Added!"});
});
exports.editeducation = catchAsyncErrors(async (req, res, next) => {
    const Student= await student.findById(req.id).exec();
    const eduIndex= Student.resume.education.findIndex(
        (i) => i.id === req.params.eduid );
    Student.resume.education[eduIndex]= 
    {...Student.resume.education[eduIndex],
     ...req.body,
    };
    await Student.save();
    res.json({ message: "Education Updated!"});
});
exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
    const Student= await student.findById(req.id).exec();
    const filterededu= Student.resume.education.filter(
        (i) => i.id !== req.params.eduid);
    Student.resume.education=filterededu;
    await Student.save();
    res.json({ message: "Education Deleted!"});
});

/*
//--------------------------------Jobs-------------------------------------------------------------------------
exports.addedjob = catchAsyncErrors(async (req, res, next) => {
    const Student= await student.findById(req.id).exec();
    Student.resume.education.push({...req.body, id:uuidv4() });
    await Student.save();
    res.json({ message: "Job Added!"});
});
exports.editjob = catchAsyncErrors(async (req, res, next) => {
    const Student= await student.findById(req.id).exec();
    const eduIndex= Student.resume.education.findIndex(
        (i) => i.id === req.params.eduid);
    Student.resume.education[eduIndex]= 
    {...Student.resume.education[eduIndex],
     ...req.body,
    };
    await Student.save();
    res.json({ message: "Jobs Updated!"});
});
exports.deletejob = catchAsyncErrors(async (req, res, next) => {
    const Student= await student.findById(req.id).exec();
    const filterededu= Student.resume.education.filter(
        (i) => i.id !== req.params.eduid);
    Student.resume.education=filterededu;
    await Student.save();
    res.json({ message: "Jobs Deleted!"});
}); 
//--------------------------------Internships----------------------------------------------------------------------
exports.addintern = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job.push({ ...req.body, id: uuidv4() });
    await studentData.save();
    res.json({ message: "Intern Added!" });
});

exports.editintern = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    const jobIndex = studentData.resume.job.findIndex(i => i.id === req.params.jobid);
    studentData.resume.job[jobIndex] = { ...studentData.resume.job[jobIndex], ...req.body };
    await studentData.save();
    res.json({ message: "Intern Updated!" });
});

exports.deleteintern = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job = studentData.resume.job.filter(i => i.id !== req.params.jobid);
    await studentData.save();
    res.json({ message: "Intern Deleted!" });
});

//----------------------------------Responsibilties------------------------------------------------------------
exports.addresp = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job.push({ ...req.body, id: uuidv4() });
    await studentData.save();
    res.json({ message: "Responsibilties Added!" });
});

exports.editresp = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    const jobIndex = studentData.resume.job.findIndex(i => i.id === req.params.jobid);
    studentData.resume.job[jobIndex] = { ...studentData.resume.job[jobIndex], ...req.body };
    await studentData.save();
    res.json({ message: "Responsibilties Updated!" });
});

exports.deleteresp = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job = studentData.resume.job.filter(i => i.id !== req.params.jobid);
    await studentData.save();
    res.json({ message: "Responsibilties Deleted!" });
});

//----------------------------------------Courses-----------------------------------------------------------
exports.addcours = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job.push({ ...req.body, id: uuidv4() });
    await studentData.save();
    res.json({ message: "Courses Added!" });
});

exports.editcours = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    const jobIndex = studentData.resume.job.findIndex(i => i.id === req.params.jobid);
    studentData.resume.job[jobIndex] = { ...studentData.resume.job[jobIndex], ...req.body };
    await studentData.save();
    res.json({ message: "Courses Updated!" });
});

exports.deletecours = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job = studentData.resume.job.filter(i => i.id !== req.params.jobid);
    await studentData.save();
    res.json({ message: "Courses Deleted!" });
});

//----------------------------------------Projects-----------------------------------------------------
exports.addproj = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job.push({ ...req.body, id: uuidv4() });
    await studentData.save();
    res.json({ message: "Project Added!" });
});

exports.editproj = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    const jobIndex = studentData.resume.job.findIndex(i => i.id === req.params.jobid);
    studentData.resume.job[jobIndex] = { ...studentData.resume.job[jobIndex], ...req.body };
    await studentData.save();
    res.json({ message: "Project Updated!" });
});

exports.deleteproj = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job = studentData.resume.job.filter(i => i.id !== req.params.jobid);
    await studentData.save();
    res.json({ message: "Project Deleted!" });
});

//---------------------------------------Skill------------------------------------------------------------------
exports.addskill = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job.push({ ...req.body, id: uuidv4() });
    await studentData.save();
    res.json({ message: "Skill Added!" });
});

exports.editskill = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    const jobIndex = studentData.resume.job.findIndex(i => i.id === req.params.jobid);
    studentData.resume.job[jobIndex] = { ...studentData.resume.job[jobIndex], ...req.body };
    await studentData.save();
    res.json({ message: "Skill Updated!" });
});

exports.deleteskill = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job = studentData.resume.job.filter(i => i.id !== req.params.jobid);
    await studentData.save();
    res.json({ message: "Skill Deleted!" });
});

//--------------------------------Accomplishments------------------------------------------
exports.addacom = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job.push({ ...req.body, id: uuidv4() });
    await studentData.save();
    res.json({ message: "Accomplishments Added!" });
});

exports.editacom = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    const jobIndex = studentData.resume.job.findIndex(i => i.id === req.params.jobid);
    studentData.resume.job[jobIndex] = { ...studentData.resume.job[jobIndex], ...req.body };
    await studentData.save();
    res.json({ message: "Accomplishments Updated!" });
});

exports.deleteacom = catchAsyncErrors(async (req, res, next) => {
    const studentData = await student.findById(req.id).exec();
    studentData.resume.job = studentData.resume.job.filter(i => i.id !== req.params.jobid);
    await studentData.save();
    res.json({ message: "Accomplishments Deleted!" });
});

// --------------- add job --------- -------------//
exports.addjob = (req,res,next)=>{

} */