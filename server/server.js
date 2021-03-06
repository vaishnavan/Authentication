const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000;
const app = express();
//auth middleware
// const auth = require("./middleware/auth");
//env config
require("dotenv").config();

//middleware
app.use(cors());
app.use(cookieParser())
app.use(express.json());

//Api Title creation
app.get("/", (req, res) => {
    res.json({message:"Authentication API creation done!!!"});
})

//router linking
app.use("/auth", require("./routes/user.route"));
app.use("/blog", require("./routes/blog.route"));

//server connection
app.listen((port), (req, res) => {
    console.log(`server up and running on port ${port}`);
});

//DB connection
mongoose.connect((process.env.MONGO_URL), {useNewUrlParser: true, useUnifiedTopology:true}, (err) => {
    if(!err){
        console.log("Database created successfully");
    }
});