const express = require("express");
const router = express.Router();

// Import controller functions
const { home, usercreate} = require("../controllers/userControllers");

// Define routes
router.get("/", home);
router.post("/create", usercreate);



module.exports = router;


//virtual dom  is a copy of real dom = refresh/reload in browser
//reconcilation in react =refresh and update 