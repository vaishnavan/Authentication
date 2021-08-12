const mongoose = require("mongoose");

//user signup and login schema creation
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    },
    confirm: {
        type: Boolean,
        default: false,
    },
    resetToken: String,
    expireTime: Date,
},
    {timestamps: true}
)

//export the mongoose model
module.exports = mongoose.model("User", userSchema);