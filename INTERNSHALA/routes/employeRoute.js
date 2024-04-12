const express = require("express");
const router = express.Router();

const { homepage,
      currentEmploye,
       employesignup,
       employesignin,
       employesignout,
       employesendmail,
       employeforgetlink,
       employeresetpassword,
       employeupdate,
       employeavatar,
       createinternship,
       readinternship,
       readsingleinternship,
       createjobs,
       readjobs,
       readsinglejobs
     } = require("../controllers/employeControllers");
const { isAuthenticated } = require("../middlewares/auth");

// Get route for/employe homepage
router.get("/", homepage);

// POst route for/employe 
router.post("/current", isAuthenticated, currentEmploye);

// Post route for/employe signup
router.post("/signup", employesignup);

// Post route for/employe student signIn
router.post("/signin", employesignin);

// Get route for/employe signOut
router.get("/signout",isAuthenticated, employesignout);

// Post route for/employe send-mail
router.post("/send-mail", employesendmail);

// get route for/employe/forget-link/:studentid
router.get("/forget-link/:id", employeforgetlink);

// post route for/employe/reset-password/:studentid
router.post("/reset-password/:id",isAuthenticated, employeresetpassword);

// post route for/employe/update/:studentid
router.post("/update/:id",isAuthenticated, employeupdate);

// post route for/employe/avatar/:studentid
router.post("/avatar/:id",isAuthenticated, employeavatar);

//------------INTERNSHIP MODEL ----------

// post route for/employe/internship/create
router.post("/internship/create",isAuthenticated, createinternship);

// post route for/employe/internship/read
router.post("/internship/read",isAuthenticated, readinternship);

// post route for/employe/internship/read/:id
router.post("/internship/read/:id",isAuthenticated, readsingleinternship);


//------------JOBS MODEL ----------

// post route for/employe/jobs/create
router.post("/jobs/create",isAuthenticated, createjobs);

// post route for/employe/jobs/read
router.post("/jobs/read",isAuthenticated, readjobs);

// post route for/employe/jobs/read/:id
router.post("/jobs/read/:id",isAuthenticated,readsinglejobs);

module.exports = router;

