const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PostMessage = require('./models/postMessage.js');
const PostQuestions = require('./models/postQuestions.js');
const NewUser = require('./models/newUser.js');
const postRoutes = require('./routes/posts.js');
const fs = require('fs');

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-headers", "Origin,X-Requested-With,Content-Type,Accept");
    next();
});
// app.use('/customer',postRoutes);
app.post('/customer', (req, res) => {
    console.log("backend response " + JSON.stringify(req.body));
    try {

        // console.log(req.file);

        let reqObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,
            occupation: req.body.occupation,
            status: req.body.status,
            acceptTerms: req.body.acceptTerms
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

// app.post('/questions', (req, res) => {
//     // console.log("req recieveeeeeeeeeeed "+JSON.stringify(req.body));
//         const newQuestion = PostQuestions.create(req.body)
//         res.status(200).json({
//             success: true,
//             newQuestion
//         })

//     res.status(201).send('question added');

// });

app.post('/questions', (req, res) => { ///:doc_id
    console.log("req.body " + req.body);
    var docs_data = req.body;
    console.log("docs_data " + docs_data);
    var name = req.params.doc_id
    // console.log(docs_data)
    let data = JSON.stringify(docs_data);
    fs.writeFileSync(`sample.json`, data)
});

app.post('/submitquestion', (req, res) => { ///:doc_id
    console.log("req.body " + req.body);
    var docs_data = req.body;
    console.log("docs_data " + docs_data);
    var name = req.params.doc_id
    // console.log(docs_data)
    let data = JSON.stringify(docs_data);
    fs.writeFileSync(`question.json`, data)
});

app.get('/askedQues', (req, res) => { ///:doc_id
    var docId = req.params.doc_id;
    fs.readFile(`sample.json`, (err, data) => { //`files/${docId}.json`
        if (err) throw err;
        let ques_data = JSON.parse(data);
        // console.log(req.params.doc_id)
        res.send(ques_data);
    });
})

app.get('/submitedqueanswer', (req, res) => { ///:doc_id
    var docId = req.params.doc_id;
    fs.readFile(`question.json`, (err, data) => { //`files/${docId}.json`
        if (err) throw err;
        let ques_data = JSON.parse(data);
        // console.log(req.params.doc_id)
        res.send(ques_data);
    });
})

// app.post('/registration',(req,res)=>{
//     console.log("reqqqqq "+JSON.stringify(req));
//     const newUser = NewUser.create(req.body)
//             res.status(200).json({
//                 success: true,
//                 newUser
//             })

//         res.status(201).send('question added');
// })

app.post('/registration/:doc_id', (req, res) => {
    var docs_data = req.body;
    var name = req.params.doc_id;
    // console.log(docs_data)
    let data = JSON.stringify(docs_data);
    fs.writeFileSync(`newFiles/${name}.json`, data)
});

// app.get('/askedQues',(req,res)=>{
//     console.log("get Questions " + JSON.stringify(req.body))
//     const newQuestion =  PostQuestions.find()
//     console.log("newQuestion "+JSON.stringify(newQuestion));

//     res.status(200).json({
//         success: true,
//         newQuestion
//     })})

const userSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userPassword: String
})

const User = new mongoose.model("User", userSchema)

app.post('/register', (req, res) => {
    // console.log(req.body);
    const { userName, userEmail, userPassword } = req.body
    User.findOne({ userEmail: userEmail }, (err, user) => {
        if (user) {
            res.send({ message: "user already present" })
        }
        else {
            const user = new User({
                userName,
                userEmail,
                userPassword
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "data saved successfully" })
                }
            })
        }
    })

})

app.post('/login', (req, res) => {
    const { userEmail, userPassword } = req.body
    // console.log("Request " + JSON.stringify(req.body));

    User.findOne({ userEmail: userEmail }, (err, user) => {
        console.log(user);

        if (user) {
            if (userPassword === user.userPassword) {

                res.send({ message: "Login Successful", user })
            }
            else {

                res.send({ message: "password did not match" })
            }
        }
        else {

            res.send({ message: "user not found" })
        }
    })

})

app.use('/public', express.static('public'))

const CONNECTION_URL = "mongodb+srv://gajanansurwase:gajanan9011@cluster0.w0nbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server is running on port:${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
//https://www.mongodb.com/cloud/atlas;
