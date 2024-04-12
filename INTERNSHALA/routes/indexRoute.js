const express = require("express");
const router = express.Router();

const { homepage,
       currentUser,
       studentsignup,
       studentforgetlink,
       studentresetpassword,
       studentsendmail,
       studentsignin,
       studentsignout,
       studentupdate,
       studentavatar,
       applyinternship,
       applyjob
     } = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");

// Get route for homepage
router.get("/", homepage);

// Pst route for /student
router.post("/student", isAuthenticated, currentUser);
   
// Post route for student signup
router.post("/student/signup", studentsignup);

// Post route for student signIn
router.post("/student/signin", studentsignin);

// Get route for student signOut
router.get("/student/signout",isAuthenticated, studentsignout);

// Post route for student send-mail
router.post("/student/send-mail", studentsendmail);

// get route for student/forget-link/:studentid
router.get("/student/forget-link/:id", studentforgetlink);

// post route for student/reset-password/:studentid
router.post("/student/reset-password/:id",isAuthenticated, studentresetpassword);

// post route for student/update/:studentid
router.post("/student/update/:id",isAuthenticated, studentupdate);

// post route for student/avatar/:studentid
router.post("/student/avatar/:id",isAuthenticated, studentavatar);

//--------------------APPLY INTERNSHIP-----------------------
// post route for student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid",isAuthenticated, applyinternship);

//--------------------APPLY JOB------------------------------
// post route for student/apply/job/:jobid
router.post("/student/apply/job/:jobid",isAuthenticated, applyjob);


module.exports = router;
