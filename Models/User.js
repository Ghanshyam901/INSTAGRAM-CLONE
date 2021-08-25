const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require: true
    },
    password:{
        type : String,
        require:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/mr-sk-vlog/image/upload/v1629717850/blank-profile-picture-973460_1280_icaajx.webp"
    },
    followers :[{
        type:ObjectId,
        ref:"User"
    }],
    following :[{
        type:ObjectId,
        ref:"User"
    }]
})

mongoose.model("User",userSchema)