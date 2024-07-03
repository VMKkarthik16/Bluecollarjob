const express = require("express")
const {RegisterUser , LoginUser, profile} = require("../controllers/user-controller")
const auth = require("../Middleware/auth")
const router = express.Router()


router.post("/signup" ,  RegisterUser)
router.post("/signin", LoginUser)
router.get("/profile", auth , profile) 


module.exports = router