const authorization = function (req, res, next){
    if(res.locals.role!='admin'){
        res.status(403).send('Operation not authorized');
    }
    next();
};

module.exports = authorization;