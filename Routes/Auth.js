const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const User = mongoose.model("User")
const requireLogin = require('../Middleware/requireLogin')
const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")

// 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

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }
}))

// router.get('/protected',requireLogin,(req,res)=>{
//     res.send("hello user")
// })

router.post('/signup', (req, res) => {
    const { name, email, password,pic } = req.body
    if (!name || !email || !password) {
        res.status(422).json({ error: "please fill all data" })
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exist...." })
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        password:hashedPassword,
                        name,
                        pic:pic
                    })

                    user.save()
                        .then(user=> {

                            transporter.sendMail({
                                to:user.email,
                                from:"noreply@insta.com",
                                subject:"signup successfully",
                                html:"<h1>welcomet to instagram<h1>"
                            }
                            
                            )   
                            res.json({ message: "Saved succesfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        }).catch(err => {
            console.log(err)
        })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email and password"})
    }
    User.findOne({email:email}).then(savedUser =>{
        if(!savedUser){
           return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch =>{
            if(doMatch == true){
                // res.json({message :"successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})

            }else{
                return res.status(422).json({error:"invalid email or password"})
            }
        }).catch(err =>{
            console.log(err)
        })
    })
})

module.exports = router;
