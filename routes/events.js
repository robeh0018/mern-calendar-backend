/*
* Events Routes
* /api/events
*/
const express = require('express');
const router = express.Router();

const { validateJWT } = require('../middleware/validateJWT');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { createEventValidations } = require('../fieldsValidations/events');
const { fieldsValidator } = require('../middleware/fieldsValidator');

// Token validation for all routes:
router.use( validateJWT );

router.get('/', getEvents );

router.post('/', createEventValidations, fieldsValidator, createEvent );

router.put('/:id', updateEvent );

router.delete('/:id', deleteEvent );

module.exports = router;
