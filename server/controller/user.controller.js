const User = require("../model/user.model");
const bcrypt = require("bcrypt");

const userController = {
    register: async (req, res) => {
        try {
            const { username, email, password, confirmpassword } = req.body;

            if(!username || !email || !password || !confirmpassword){
                return res.status(400).json({message:"All the fields are required"});
            }
            
            const user = await User.findOne({email});
            if(user) return res.status(400).json({message:"User all already exists"});

            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(email)) return res.status(400).json({message:"Incorrect email"});

            if(password.length < 6) return res.status(400).json({message:"password character should morethan 6 characters"});

            if(password !== confirmpassword) return res.status(400).json({message:"password incorrect"});

            //bcrypt password
            const hashpass = await bcrypt.hash(password, 10);

            const userData = new User({
                username,
                email,
                password: hashpass,
                confirmpassword:hashpass,
            })
            await userData.save()
            res.status(200).json(userData);
            
        } catch (error) {
            return res.status(404).json({message:error.message});
        }
    }
}

module.exports = {userController};