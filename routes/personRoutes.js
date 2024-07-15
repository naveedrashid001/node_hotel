const express = require('express');
const router = express.Router();
const Person = require("./../model/person");

const { jwtAuthMiddleware, generateToken } = require('../jwt')

// signup person route
router.post('/signup', async (req, res, next) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");

        const payload = {
            id: response.id,
            username: response.username
        }
        const token = generateToken(payload);

        res.status(201).json({ response: response, toekn: token });
        console.log(token);
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).send(err);
    }
});
// login page
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

       // Find the user by username
       const user = await Person.findOne({username: username});

        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'invalid user name or password' });
    
        }
         // generate Token 
         const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    } catch (err) {
        res.status(404).send("error");
    }
})

// Get all person
router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
        const allperson = await Person.find();
        res.status(200).send(allperson);
    } catch (err) {
        res.status(404).send("error");
    }
})

// Find chef | manager | waiter
router.get('/:worktype', jwtAuthMiddleware, async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (["chef", "manager", "waiter"].includes(worktype)) {
            const response = await Person.find({ work: worktype });
            console.log("Data fetched");
            res.status(200).json(response);
        } else {
            res.status(404).send("Work type is invalid");
        }
    } catch (err) {
        res.status(404).send(err, "internal server error");
    }
});

// Update person
router.put('/:id',jwtAuthMiddleware,  async (req, res) => {
    try {
        const personid = req.params.id;
        const persondata = req.body;
        const response = await Person.findByIdAndUpdate(personid, persondata, {
            new: true,
            runValidators: true
        });
        if (!response) {
            return res.status(500).json("ID not found");
        }
        res.status(200).json({
            message: "Data updated successfully",
            data: response
        });
        console.log("Data updated successfully");
    } catch (err) {
        res.status(404).send(err, "internal server error");
    }
})

// Delete person
router.delete('/:id',jwtAuthMiddleware, async (req, res) => {
    try {
        const personid = req.params.id;
        const response = await Person.findByIdAndDelete(personid);
        if (!response) {
            return res.status(500).json("ID not found");
        }
        res.status(200).json({
            message: "Data deleted successfully"
        });
        console.log("Data deleted successfully");
    } catch (err) {
        res.status(404).send(err, "internal server error");
    }
})

module.exports = router;
