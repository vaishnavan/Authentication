const User = require("../model/user.model");
const Notifications = require("../model/notification.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const transport = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 587,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});


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
            .then(data => {
                const signupuser = async () => {
                    await new Notifications({
                        userid: data._id,
                        category: 'security',
                        title:'Welcome, You have successfully created an account',
                        content: 'We are excited to welcome you to our platform, Hope you enjoy the journey with us.',
                    }).save()
                    res.status(200).json(userData);
                }
                signupuser();
            })
    
            
            
            
        } catch (error) {
            return res.status(404).json({message:error.message});
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if(!email || !password){
                return res.status(400).json({message:"All the fields are required"});
            }

            //email exists or not checking
            const user = await User.findOne({email});
            if(!email) return res.status(400).json({message:"email doesn't exists"});

            //password match checking
            const doMatch = await bcrypt.compare(password, user.password);
            if(!doMatch) return res.status(400).json({message:"password Incorrect"});

            //preparing the login response
            if(doMatch){
                //jwt token creation
                const token = jwt.sign({_id:user._id}, process.env.JWT_SUSPENSE , {expiresIn:'1d'});
                const options = {
                    expires:new Date(Date.now() + 900000),
                    httpOnly: false
                }
                res.cookie('jwt-token', token, options);
                transport.sendMail({
                    to: user.email,
                    from: process.env.EMAIL,
                    subject: `Signup Successful`,
                    html: `
                    <h1>Welcome, ${user.username} To Dark Services</h1>
                    <h5>Successfully  signup </h5>
                    `,
                });
                const {_id, username, email} = user
                res.status(200).json({
                    mytoken: token,
                    user:{
                        _id,
                        username,
                        email
                    }
                })
            }
            
        } catch (error) {
            return res.status(404).json({message:error.message});
        }
    },

    resetPassword : (req, res) => {
        crypto.randomBytes(32, (err, buffer) => {
            if(err){
                console.log(err);
            }
            const token = buffer.toString("hex");
            User.findOne({email:req.body.email})
            .then( async (user) => {
                if(!user){
                    return res.status(422).json({error:"User don't exists with the email"})
                }
                user.resetToken = token;
                user.expireTime = Date.now() + 3600000
                user.save()
                .then((result) => {
                    transport.sendMail({
                        to:user.email,
                        from:process.env.EMAIL,
                        subject:"password reset",
                        html:`
                            <p>You requested for password reset</p>
                            <h5>click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                        `
                    })
                    res.json({message:"check your email"})
                })
                
            })
        })
    },
    newPassword: (req, res) => {
        const newPass = req.body.password;
        const sentToken = req.body.token;
        User.findOne({resetToken:sentToken, expireTime:{$gt: Date.now()}})
        .then(user => {
            if(!user){
                return res.status(422).json({message:"try again"})
            }
            bcrypt.hash(newPass,12)
            .then(hashpass => {
                user.password = hashpass
                user.confirmpassword = hashpass
                user.resetToken = undefined
                user.expireTime = undefined
                user.save()
                .then(() => {
                    return res.status(200).json({message:"password updated success"});
                })
                
            })
        })
    }
}

module.exports = {userController};