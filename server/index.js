const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PostMessage = require ('./models/postMessage.js');

const postRoutes = require('./routes/posts.js');

const app = express();

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
// app.use('/customer',postRoutes);
app.post('/customer',(req,res)=>{
    console.log("backend response "+JSON.stringify(req.body));
    try {

        // console.log(req.file);

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

    res.status(201).send('user created');
});
app.use('/public', express.static('public'))

const CONNECTION_URL = "mongodb+srv://gajanansurwase:gajanan9011@cluster0.w0nbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`server is running on port:${PORT}`)))
.catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify',false);
//https://www.mongodb.com/cloud/atlas;
