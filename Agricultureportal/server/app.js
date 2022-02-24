const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//dotenv.config({ path: './config.env' });

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our route easy 
app.use(require('./router/auth'));

const PORT = process.env.PORT || '5000';


// Middelware 
const middleware = (req,res, next) => {
    console.log(`Hello my Middleware`);
    next();
}

// app.get('/', (req, res) => {
//     res.send(`Hello world from the server app.js`);
// });




app.get('/signup', (req, res) => {
    //res.send(`Hello signup world from the server`);
    res.render("Signup");
});


app.post('/signup',async (req, res) => {
    console.log(req.body.fname);
     
});

app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})