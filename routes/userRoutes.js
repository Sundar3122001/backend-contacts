const express= require("express");
const router=express.Router();
const userController= require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.get("/current",validateToken,userController.currentUser)
module.exports= router;