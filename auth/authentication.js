const jwt = require('jsonwebtoken');

const VerifyAuth = (req, res, next) => {
    console.log(req.headers.authorization);

    if (!req.headers.authorization) {  
        res.status(401);
        return res.send('Auth Failed: No Token Provided');  
    }

    var token = req.headers.authorization.slice(7); // Only execute if authorization exists

    try {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.status(403);
                return res.send('Auth Failed: Invalid Token');
            }
            res.locals.username = decoded.username;
            res.locals.role = decoded.role;
            console.log(decoded);
            next();
        });
    } catch (err) {
        res.status(401);
        res.send('Auth Failed');
    }
};

module.exports = VerifyAuth;
