const express = require('express')
const db = require("./db")
const bodyParser = require("body-parser");

// all model require
const Person = require("./model/person")
const Menuitem = require("./model/Menuitem")

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// post person route
app.post('/person', async (req, res, next) => {
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
app.get('/person', async (req, res) => {
  try{
    const data = req.body;
    const allperson = await Person.find()
    res.status(200).send(allperson);
  }
  catch(err){
    res.status(404).send("error")
  }
})


app.listen(port, () => {
  console.log(`server are listening on port ${port}`)
})