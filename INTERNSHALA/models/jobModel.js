const mongoose = require("mongoose");

const jobModel = new mongoose.Schema({
    students:[{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
    employe:{type:mongoose.Schema.Types.ObjectId,ref:"employe"},
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    skill: {
        type: String,
        required: [true, "Skill is required"],
        trim: true
    },
    jobtype: {
        type: String,
        enum: ["In office", "Remote"],
        required: [true, "Job type is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    preferences: {
        type: String,
        trim: true
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"],
        min: [0, "Salary must be a non-negative value"]
    },
    perks: {
        type: String,
        trim: true
    },
    assessments: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Job = mongoose.model("job", jobModel);
module.exports = Job;

/*
const jobModel=new mongoose.Schema({
      job:{type:mongoose.Schema.Types.ObjectId,ref:"job"},
      title:String,
      skill:String,
      jobtype:{type:String, enum:["In office", "Remote"]},
      description:String,
      prefrences:String,
      salary:Number,
      perks:String,
      assesments:String,
},
      {timestamps:true}
);
const Job=mongoose.model("job",jobModel)
module.exports=Job;
*/

