const Registerjob = require("../models/registerjob-model")


const Registerjobs = async (req, res) => {
    const {
        Name,
        Age,
        Gender,
        Experience,
        PhoneNumber,
        Myskills,
        State,
        District,
        Place
    } = req.body;

    try {
        const userId = req.user.id;
        console.log(`User ID: ${userId}`);
        
        const jobData = {
            ...req.body,
            userId: userId,
        };

        if (!Name || !Age || !Gender || !Experience || !PhoneNumber || !Myskills || !State || !District || !Place) {
            return res.status(400).json({ message: "Please Fill all Mandatory Fields" });
        }

        // Check if the PhoneNumber already exists
        const existingJob = await Registerjob.findOne({ PhoneNumber: PhoneNumber });
        if (existingJob) {
            return res.status(400).json({ message: "Phone Number already exists" });
        }

        const newJob = new Registerjob(jobData);
        await newJob.save();

        res.status(200).json({ message: "Job Posted Successfully", job: newJob });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate key error: Phone Number already exists" });
        }
        console.error(`Error Job Posting: ${error.message}`);
        res.status(400).json({ message: `Error Job Posting: ${error.message}` });
    }
};



const Viewjobsbyuser = async (req,res) =>{
    try {
        const userId = req.user.id;
        const jobs = await Registerjob.find({ userId });
        console.log(jobs);
        res.status(200).json({
            message: "fetched successfully",
            jobs: jobs
        });
    } catch (error) {
        res.status(400).send(`Error Fetching jobs: ${error.message}`)
    }

}

const UserEditJob = async (req,res) =>{
    const useredit = req.body;
    const {userid }= req.params;
    console.log(useredit);
    console.log(userid);
    try {
    const edit = await Registerjob.findByIdAndUpdate(userid , useredit , {new:true})
    console.log(edit);
        res.status(200).json("upadated successfully")
        
    } catch (error) {
        console.error(`Error updating job: ${error.message}`);
        res.status(400).send("error updating")
    }
    
}

const Userdeletejob = async(req,res) =>{
    const {userid}  = req.params;
    try {
        const deletejob = await Registerjob.findByIdAndDelete(userid)
        if (!deletejob) {
            res.status(200).json("job is not registered")
        }
        res.status(200).json("Deleted Successfully")
    } catch (error) {
        res.status(400).json("message:" ,error)
    }
}



module.exports = {Registerjobs , Viewjobsbyuser , UserEditJob , Userdeletejob};