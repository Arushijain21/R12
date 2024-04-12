const express = require("express");
const router = express.Router();
const { resume,
        addeducation,
        editeducation,
        deleteeducation   } = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");/*
{
    addjob,
        editjob,
        deletejob,
        addintern,
        editintern,
        deleteintern,
        addresp,
        editresp,
        deleteresp,
        addcours,
        editcours,
        deletecours,
        addproj,
        editproj,
        deleteproj,
        addskill,
        editskill,
        deleteskill,
        addacom,
        editacom,
        deleteacom
}*/

// Get /
router.get("/", isAuthenticated, resume);

//-----------------------Education------------------------
// Post
router.post("/add-edu", isAuthenticated, addeducation);

// Post
router.post("/edit-edu/:eduid", isAuthenticated, editeducation);

// Post
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation);


module.exports = router;

/*
//-------------------------Job-------------------------------
// Post
router.post("/add-job", isAuthenticated, addjob);

// Post
router.post("/edit-job/:jobid", isAuthenticated, editjob);

// Post
router.post("/delete-job/:jobid", isAuthenticated, deletejob);

//-------------------------Internships--------------------------
// Post
router.post("/add-intern", isAuthenticated, addintern);

// Post
router.post("/edit-intern/:internid", isAuthenticated, editintern);

// Post
router.post("/delete-intern/:internid", isAuthenticated, deleteintern);

//--------------------------Responsibilities------------------------
// Post
router.post("/add-resp", isAuthenticated, addresp);

// Post
router.post("/edit-resp/:respid", isAuthenticated, editresp);

// Post
router.post("/delete-resp/:respid", isAuthenticated, deleteresp);

//----------------------------Courses--------------------------------
// Post
router.post("/add-cours", isAuthenticated, addcours);

// Post
router.post("/edit-cours/:coursid", isAuthenticated, editcours);

// Post
router.post("/delete-cours/:coursid", isAuthenticated, deletecours);

//-----------------------------Projects-------------------------------
// Post
router.post("/add-proj", isAuthenticated, addproj);

// Post
router.post("/edit-proj/:projid", isAuthenticated, editproj);

// Post
router.post("/delete-proj/:projid", isAuthenticated, deleteproj);

//---------------------------Skill-------------------------------------
// Post
router.post("/add-skill", isAuthenticated, addskill);

// Post
router.post("/edit-skill/:skillid", isAuthenticated, editskill);

// Post
router.post("/delete-skill/:skillid", isAuthenticated, deleteskill);

//---------------------------Accomplishment---------------------------
// Post
router.post("/add-acom", isAuthenticated, addacom);

// Post
router.post("/edit-acom/:acomid", isAuthenticated, editacom);

// Post
router.post("/delete-acom/:acomid", isAuthenticated, deleteacom);

module.exports = router;
*/