const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const FrontendToken = req.headers.token;
    if(FrontendToken){
        const FrontendTokenReadyToVerify = FrontendToken.split(" ")[1];
        jwt.verify(FrontendTokenReadyToVerify, process.env.JWT_SECRET, (err, user) => {
            if(err) res.status(403).json('Używany token jest niewłaściwy');
            req.user = user;
            next();
        })
    }else{
        res.status(401).json("Niezautoryzowany użytkownik");
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("Brak uprawnień");
        }
    })
}




module.exports = { verifyToken, verifyTokenAndAuthorization }