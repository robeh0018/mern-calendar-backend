const { validationResult } = require('express-validator');
const { successFalse } = require('../services/standardResponcesService');


const fieldsValidator = ( req, res, next ) => {

    const errors = validationResult( req );
    if( !errors.isEmpty() ) {

       return res.status(400).send( successFalse( errors.mapped() ) );

    }
    next();
};

module.exports = { fieldsValidator };
