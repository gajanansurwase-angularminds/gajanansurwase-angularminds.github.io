const PostMessage = require ('../models/postMessage.js');


module.exports = createCustomer = async (req, res) => {
    console.log("req " + JSON.stringify(req.body))
    try {
        const url = req.protocol + '://' + req.get('host')

        console.log(req.file);

        let reqObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,
            occupation: req.body.occupation,
            status: req.body.status,
            profilePicture: url + '/public/' + req.file.filename
        }


        const newCustomer = await PostMessage.create(reqObject)
        res.status(200).json({
            success: true,
            newCustomer
        })

    } catch (err) {
        res.status(500).json({ error: err.message });

    }
}
