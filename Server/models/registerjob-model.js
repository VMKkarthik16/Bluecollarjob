const mongoose = require("mongoose");


const RegisterJobSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    Name :{
        type:String,
        required:true
    },
    Age :{
        type:Number,
        required:true
    },
    Gender :{
        type:String,
        required:true
    },
    Experience :{
        type:Number,
        required:true
    },
    PhoneNumber :{
        type:Number,
        required:true,
        unique: [true, "Phone number is already in use."],
    },
    Myskills :{
        type:String,
        required:true
    },
    State :{
        type:String,
        required:true
    },
    District :{
        type:String,
        required:true
    },
    Place :{
        type:String,
        required:true
    },
})

const Registerjob = mongoose.model("registerjob" , RegisterJobSchema)

module.exports = Registerjob;