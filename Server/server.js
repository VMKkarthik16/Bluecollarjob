const express = require("express")
const dotenv = require("dotenv")
const database = require("./Database/db")
const cors = require("cors")
const bodyparser = require("body-parser")
const userrouter = require("./routes/user-routes")
const jobrouter = require("./routes/registerjob-routes")

dotenv.config()
const app = express()

app.use(cors())
app.use(bodyparser.json());
app.use(express.json())

app.use("/api", userrouter)
app.use("/api", jobrouter)

const db = database()

const port = process.env.PORT || 5000


app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
})

