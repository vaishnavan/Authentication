const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const app = express();
//env config
require("dotenv").config();

//middleware
app.use(express.json());

//router linking
app.use("/auth", require("./routes/user.route"));

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