const shortid = require('shortid')
const URL = require('../models/url');
const { response } = require("express");

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    console.log(body)
    if(!body.url) return res.status(400).json({error:'url is required'})
    const newId = shortid.generate();
    await URL.create({
        shortId :newId,
        redirectURL:body.url,
        visitHistory:[],
        createdBy: req.user._id,

    });
    return res.render('home',{
        id:newId
    })
}


module.exports = {
    handleGenerateNewShortURL,
}
