const express = require('express');
const db = require("./db");
const bodyParser = require("body-parser");
// const passport = require('./auth')
require("dotenv").config();

const personRoutes = require("./routes/personRoutes");
const menuitemRoutes = require("./routes/menuitemRoutes");

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Middleware 
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] request made to ${req.originalUrl}`);
    next();
}

// Apply middleware to all routes
app.use(logRequest);

// Authorization
// app.use(passport.initialize());

app.get('/', (req, res) => {
    res.send("Welcome to our hotel");
});

// const localmiddleware = passport.authenticate('local', { session: false })

// Apply authentication middleware
app.use('/person', personRoutes);  //
app.use('/menuitem', menuitemRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
