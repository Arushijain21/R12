
const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
    employe:{type:mongoose.Schema.Types.ObjectId,ref:"employe"},
    students:[{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
    profile: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    internshiptype: {
        type: String,
        enum: ["In office", "Remote"],
        required: true
    },
    openings: {
        type: Number,
       // required: true,
        min: 1 // Minimum value allowed for openings
    },
    from: {
        type: String,
        //required: true
    },
    to: {
        type: String,
       // required: true
    },
    duration: {
        type: String,
        required: true
    },
    responsibility: {
        type: String,
      //  required: true
    },
    stipend: {
        status: {
            type: String,
            enum: ["Fixed", "Negotiable", "Performance based", "unpaid"],
            //required: true
        },
        amount: {
            type: Number,
            required: function() {
                return this.stipend.status !== "unpaid"; // Amount is required if status is not unpaid
            }
        }
    },
    perks: {
        type: String
    },
    assessments: {
        type: String
    }
}, { timestamps: true });

const Internship = mongoose.model("internship", internshipSchema);
module.exports = Internship;
/*
const mongoose =require("mongoose");
const internshipModel=new mongoose.Schema({
      profile:String,
      skill:String,
      internshiptype:{type:String, enum:["In office", "Remote"]},
      openings:Number,
      from:String,
      to:String,
      duration:String,
      responsibility:String,
      stipend:{
        status:{
        type:String, 
        enum:["Fixed", "Negotiable","Performance based","unpaid"]
      },
      amount:Number,
    },
      perks:String,
      assesments:String,

},
    {timestamps:true}
);

const Internship=mongoose.model("internship",internshipModel)
module.exports=Internship;
*/
