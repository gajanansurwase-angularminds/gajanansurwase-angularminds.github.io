const createRequire = require('module');
const PostMessage = require ('../models/postMessage.js');

const express = require('express');
const  createCustomer = require('../controllers/posts.js');

const router = express.Router();


router.post("/customer",(req, res)=>{
    console.log("req " + JSON.stringify(req.body))
    try {

        console.log(req.file);

        let reqObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,
            occupation: req.body.occupation,
            status: req.body.status,
            acceptTerms:req.body.acceptTerms
        }


        const newCustomer = PostMessage.create(reqObject)
        res.status(200).json({
            success: true,
            newCustomer
        })

    } catch (err) {
        res.status(500).json({ error: err.message });

    }
});


module.exports = router;