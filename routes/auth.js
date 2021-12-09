const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');

// REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPT_PASS).toString(),
    })

    const savedUser = await newUser.save();
    try {
        console.log(savedUser);
        res.status(201).json(savedUser);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// LOGIN


module.exports = router;