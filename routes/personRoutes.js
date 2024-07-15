const express = require('express')
const router = express.Router();
const Person = require("./../model/person")


// post person route
router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(201).send(response);
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).send(err);
    }
});

// get all person 
router.get('/', async (req, res) => {
    try {
        const data = req.body;
        const allperson = await Person.find()
        res.status(200).send(allperson);
    }
    catch (err) {
        res.status(404).send("error")
    }
})

// find chef | manager | waiter 
router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
            const response = await Person.find({ work: worktype })
            console.log("data are fatched")
            res.status(200).json(response);
        }
        else {
            res.status(404).send("work type is invalid")
        }
    }
    catch (err) {
        res.status(404).send(err, "internal server error")
    }
})
//   update routes
router.put('/:id', async (req, res) => {
    try {
        const personid = req.params.id;
        const persondata = req.body;
        const response = await Person.findByIdAndUpdate(personid, persondata, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(500).json("id not fond")
        }
        res.status(200).json({
            message: "Data updated successfully",
            data: response
          });
        console.log("data updated successfully")
    }
    catch (err) {
        res.status(404).send(err, "internal server error")
    }
})
// delete person 
router.delete('/:id', async (req, res) => {
    try {
        const personid = req.params.id;
        const response = await Person.findByIdAndDelete(personid, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(500).json("id not fond")
        }
        res.status(200).json({
            message: "Data deleted successfully"
          });
        console.log("data deleted successfully")
    }
    catch (err) {
        res.status(404).send(err, "internal server error")
    }
})

module.exports = router;