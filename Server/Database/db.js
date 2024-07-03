const mongoose = require("mongoose")
require("dotenv").config()

const database = () =>{ 
    try {
        mongoose.connect("mongodb://0.0.0.0:27017/Bluecollarjob");
        console.log("Mongodb Connected Successfully");
    } catch (error) {
        console.log(`Mongodb Connection Error ${error}`);
    }
}
8
module.exports = database;

