const express = require("express")
const {Registerjobs , Viewjobsbyuser, UserEditJob , Userdeletejob} = require("../controllers/regiterjob-controllers")
const jobrouter = express.Router()
const auth = require("../Middleware/auth")  



jobrouter.post("/registerjob" , auth, Registerjobs);
jobrouter.get("/getsinglejob" , auth, Viewjobsbyuser);
jobrouter.put("/getsinglejobupdate/:userid" , UserEditJob);
jobrouter.delete("/getsinglejobdelete/:userid" , Userdeletejob);



module.exports  = jobrouter ;    



