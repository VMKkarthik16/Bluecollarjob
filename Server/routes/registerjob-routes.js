const express = require("express")
const {Registerjobs , Viewjobsbyuser} = require("../controllers/regiterjob-controllers")
const jobrouter = express.Router()
const auth = require("../Middleware/auth")  



jobrouter.post("/registerjob" , auth, Registerjobs);
jobrouter.get("/getsinglejob" , auth, Viewjobsbyuser);


module.exports  = jobrouter ;    



