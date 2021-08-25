const e = require("express");
const express = require("express");
const App = express();
const mongoose = require('mongoose');
const PORT =process.env.PORT || 5000;
const {MONGOURI} = require('./config/keys')
// UfuTyMhzdNBtqMZd




mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo db");
})

mongoose.connection.on('error',(err) =>{
    console.log("err connecting", err);
})

require('./Models/User')
require('./Models/Post')

App.use(express.json())
App.use(require('./Routes/Auth'))   
App.use(require('./Routes/PostR'))   
App.use(require('./Routes/user'))  


if(process.env.NODE_ENV =="production"){
    App.use(express.static('client/build'))
    const path = require("path")
    App.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))

        
    })
}

App.listen(PORT,()=>{
    console.log("APP IS RUNNING" , PORT);
})