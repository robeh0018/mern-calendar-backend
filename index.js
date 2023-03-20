/*
* Users Routes
*   host + /api/auth
* */
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();


//DB
const { dbConnection } = require('./database/config');
dbConnection();

// Middleware
app.use( cors() );
app.use( express.static('public') );
app.use( express.json() );

//Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const eventsRoutes = require('./routes/events');
app.use('/api/events', eventsRoutes);

// Listen petitions;
const PORT = process.env.PORT;
app.listen( PORT, () => console.log(`Server listen on port ${ PORT }`));
