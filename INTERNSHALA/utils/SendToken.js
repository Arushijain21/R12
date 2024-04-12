exports.sendtoken = (student, statusCode, res) => {
    // Generate JWT token for the student
    const token = student.getjwttoken(); // Assuming getjwttoken is a method on the student model to generate JWT token
    const options={
        exipres:new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 *60 *60 *1000
        ),
        httpOnly:true,
        //secure:true,
    };
    res.status(statusCode)
    .cookie("token",token,options)
    .json({success:true,id:student._id,token});
    // Send the token back to the client in the response
    res.status(statusCode).json({ token });
};

/*
exports.sendtoken=(student,statusCode,res)=>{
    const token=student.getjwttoken();
    res.json({token});
}; */