const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')

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

router.post('/login', async (req, res) =>{
    try {
        const user = await User.findOne({
            username: req.body.username,
        })
        !user && res.status(401).json("Podano nieprawidłowe dane.");

        const hashedPassword = await CryptoJS.AES.decrypt(user.password, process.env.ENCRYPT_PASS);
        const ProperPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        ProperPassword !== req.body.password && res.status(401).json("Podano nieprawidłowe hasło.");

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user._isAdmin,
        }, 
        process.env.JWT_SECRET,
        {expiresIn: "3d"}
        )

        const { password, ...userDataWithoutPassword } = user._doc;
        res.status(200).json({...userDataWithoutPassword, accessToken});

    } catch(err) {
        res.status(500).json(err);
    }
})


module.exports = router;