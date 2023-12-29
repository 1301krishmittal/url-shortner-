const express = require('express');
const {handleGenerateNewShortURL} = require('../controllers/url')
const router = express.Router();
const URL = require('../models/url');


router.post('/',handleGenerateNewShortURL);


router.get('/analytics/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId 
    },
    {
        $push:{
            visitHistory:{timestamp:Date.now(),}
        },
    })
    res.redirect(entry.redirectURL);
})



module.exports = router;


 