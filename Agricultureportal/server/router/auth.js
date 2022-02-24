const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

router.post('/register',async(req,res)=>
{
    const {fname,lname,gender,email,phone,password} = req.body;

    const user=new user({fname,lname,gender,email,phone,password});

    await user.save();

    res.status(201).json({message:"user registration successfuly"});
});

module.exports = router;

