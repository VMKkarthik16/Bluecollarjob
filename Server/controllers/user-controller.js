const User = require("../models/user-model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const jwt_secreat = "nskfnkjnnlsfnlwn"


const RegisterUser = async (req, res) => {
    const { Email, Mobilenumber, Name, Password } = req.body;
    
    // Basic validation
    if (!Email || !Mobilenumber || !Name || !Password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists." });
        }
       
        const hashedpassowrd = await bcrypt.hash(Password , 10)

        // Create new user
        const newUser = await User.create({
            Email,
            Mobilenumber,
            Name,
            Password : hashedpassowrd
        });

        // Send response
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}



const LoginUser = async (req, res) => {
    const { Email, Password } = req.body;

    // Basic validation
    if (!Email || !Password) {
        return res.status(400).json({ message: "Please provide Email and Password." });
    }

    try {
        // Find user by email
        const alreadyuser = await User.findOne({ Email });
        if (!alreadyuser) {
            return res.status(401).json({ message: "User not registered. Please sign up." });
        }

        // Compare provided password with stored hashed password
        const checkpassword = await bcrypt.compare(Password, alreadyuser.Password);
        if (!checkpassword) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
          const token = jwt.sign({id :alreadyuser._id} , jwt_secreat , { expiresIn: '1h' })
        // If password matches, send success response
        res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const profile = (req , res ) =>{
    res.json({ message: "Welcome to your profile.", user: req.user });
}

module.exports = {RegisterUser , LoginUser , profile  };
