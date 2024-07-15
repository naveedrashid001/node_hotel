const express = require('express')
const db = require("./db")
const bodyParser = require("body-parser");

const personRoutes = require("./routes/personRoutes")
const menuitemRoutes = require("./routes/menuitemRoutes")

require("dotenv").config();

const app = express()
const port = process.env.port || 3000;

app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/person', personRoutes)    // person routes

app.use('/menuitem', menuitemRoutes)    // menu item routes


// post menuitem  route



app.listen(port, () => {
  console.log(`server are listening on port ${port}`)
})