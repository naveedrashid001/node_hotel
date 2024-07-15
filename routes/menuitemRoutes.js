const express = require('express')
const router = express.Router();
const Menuitem = require("./../model/Menuitem")

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const newMenuitem = new Menuitem(data);
        const response = await newMenuitem.save();
        console.log("Data saved");
        res.status(201).send(response);
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).send(err);
    }
});

// get all menuitem 
router.get('/', async (req, res) => {
    try {
        const data = await Menuitem.find()
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).send("error")
    }
})

// get tast menuitem 
router.get('/:tast', async (req, res) => {
    try {
        const tast = req.params.tast;
        if (tast === 'spicy' || tast === 'sweet' || tast === 'hot') {
            const data = await Menuitem.find({ tast: tast });
            console.log("Data fetched successfully");
            res.status(200).json(data);
        } else {
            res.status(404).send("You entered an invalid tast");
        }

    }
    catch (err) {
        res.status(404).send("error")
    }
})


module.exports = router;