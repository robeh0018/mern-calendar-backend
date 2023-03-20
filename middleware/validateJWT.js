const jwt = require('jsonwebtoken');
const { successFalse } = require('../services/standardResponcesService');

const validateJWT = ( req, res, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).send( successFalse('There is no token in the request') );
    }

    try {

        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );

        req.uid = uid;
        req.name = name;

    } catch (e) {

        console.log(e);
        return res.status(401).send( successFalse('Token is not valid') );

    }

    next();
};

module.exports = { validateJWT };