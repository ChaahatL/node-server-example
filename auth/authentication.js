const jwt = require('jsonwebtoken');

const VerifyAuth = (req, res, next) => {
    console.log(req.headers.authorization);
    var token = req.headers.authorization.slice(7, req.headers.authorization.length);
    try{
        jwt.verify(token,'secret',(_err,decoded) => {
            res.locals.username = decoded.username;
            res.locals.role = decoded.role;
            console.log(decoded);
            next();
        });
    } catch (err){
        res.status(401);
        res.send('Auth Failed');
    }
}

module.exports = VerifyAuth;