const { check } = require('express-validator');
const { fieldsValidator } = require('../middleware/fieldsValidator');


const registerFieldsValidations = [
    check( 'name',  'The name is required' ).not().isEmpty(),
    check('email', 'The email is required' ).isEmail(),
    check('password', 'The password should have 6 characters like min').isLength({ min: 6 }),
    fieldsValidator,
];

const loginFieldsValidations = [
    check('email', 'The email is required' ).isEmail(),
    check('password', 'The password should have 6 characters like min').isLength({ min: 6 }),
    fieldsValidator,
];


module.exports = { registerFieldsValidations, loginFieldsValidations };
