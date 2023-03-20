const express = require('express');
const router = express.Router();

const { registerUser, renew, login } = require('../controllers/auth');
const { registerFieldsValidations, loginFieldsValidations } = require('../fieldsValidations/auth');
const { validateJWT } = require('../middleware/validateJWT');

router.post('/register', registerFieldsValidations, registerUser );

router.post('/login', loginFieldsValidations, login );

router.get('/renew', validateJWT ,renew );


module.exports = router;
