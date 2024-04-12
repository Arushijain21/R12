//const {default: mongoose}= require("mongoose");
const mongoose =require("mongoose");
const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");

const studentModel=new mongoose.Schema({
   
      firstname:{
         type:String,
         required:[true,"First Name is required"],
         minlength:[4,"First name should be atleast 4 character long"]
      
      },
      lastname:{
         type:String,
         required:[true,"Last Name is required"],
         minlength:[4,"Last name should be atleast 4 character long"]
      
      },
     
      contact:{
         type:String,
         required:[true,"Contact is required"],
         minlength:[5,"Contact must not exceed  5 character long"],
         maxlength:[20,"Contact should be atleast 20 character long"]
      
      },
      city:{
         type:String,
         required:[true,"City Name is required"],
         minlength:[3,"City name should be atleast 3 character long"]
      
      },
      gender:{
         type:String,
         enum:["Male","Female","Others"],
      },
      avatar:{
         type:Object,
         default:{
            fileId:"",
            url:"https://images.unsplash.com/photo-1481841580057-e2b9927a05c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         }
      },
     resume:{
        education:[],
        jobs:[],
        internships:[],
        responsibilties:[],
        courses:[],
        projects:[],
        skills:[],
        accomplishments:[],
         
      }, 
      jobs:[
         {type:mongoose.Schema.Types.ObjectId,ref:"job"}
     ],
     internships:[
         {type:mongoose.Schema.Types.ObjectId,ref:"internship"}
     ],
     email:{
        type:String,
        unique:true,
        required:[true, "Email is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

    },
     password:{
        type:String,
        select:false,
        maxlength:[15,"Password should not exceed more than 15 characters"],
        minlength:[6,"Password should have atleast 6 characters"], 
     //   match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,10220}$/] ,

    },  
    resetPasswordToken:{
      type:String,
      default:"0",
    },
    
}, 
{timestamps:true}
);
//password encrypt=bcrypt
studentModel.pre("save", function(){
   if(!this.isModified("password")){
      return;
   }
   let salt=bcrypt.genSaltSync(10);
   this.password=bcrypt.hashSync(this.password,salt);
});

studentModel.methods.comparepassword = function(password){
  return bcrypt.compareSync(password, this.password);
}
//JWT Token
//const jwt = require('jsonwebtoken');

studentModel.methods.getjwttoken = function(){
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
   });
};

const student=mongoose.model("student",studentModel)
module.exports=student;