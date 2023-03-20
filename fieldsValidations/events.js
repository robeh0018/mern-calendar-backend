const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const createEventValidations = [
    check('title', 'The title is required').not().isEmpty(),
    check('start', 'The Start date is required').custom( isDate ),
    check('end', 'The End date is required').custom( isDate ),
];


module.exports = { createEventValidations };
