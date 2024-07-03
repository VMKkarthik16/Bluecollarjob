const jwt = require("jsonwebtoken")
const jwt_secreat = "nskfnkjnnlsfnlwn"

const auth = (req,res,next) =>{

    try {
        const token = req.header("authorization")?.split(' ')[1];

        if (!token) {
            res.status(400).json("Token Not Provided")
        
        }
    const verify = jwt.verify(token , jwt_secreat)
    req.user  = verify
    next()
        
    } catch (error) {
        res.status(401).json({ message: "Token is not valid.", error });
    }

   
}
module.exports = auth;