const { response } = require('express');
const {setUser} = require('../service/auth')
const {v4:uuidv4} = require('uuid')
const User = require('../models/user')

async function handleUserSignup(req,res){
    const { name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.render('home');
}


async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user  = await User.findOne({email,password});
    
    // console.log(user,"jello")
    if(!user) 
        return res.render("login", {
        error: "invalid username or password",
    });
    const token = setUser(user);
    res.cookie("uid",token);
    return res.redirect('/');
}



module.exports = {
    handleUserSignup,handleUserLogin
}