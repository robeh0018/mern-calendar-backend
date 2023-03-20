const { successFalse, successTrue } = require('../services/standardResponcesService');
const Event = require('../models/eventModel');


const getEvents = async ( req, res ) => {

    try {

        const events = await Event.find({ user: req.uid }).populate('user', 'name');


        res.send( successTrue( events ) );

    } catch (e) {

        console.log( e );
        res.status(500).send( successFalse( 'Server error' ) );

    }

};

const createEvent = async ( req, res ) => {

    try {

        const event = new Event( req.body );

        event.user = req.uid;
        await event.save();

        res.send( successTrue( event ) )

    } catch (e) {

        console.log(e);
        res.status(500).send( successFalse('Server error') )

    }

};

const updateEvent = async ( req, res ) => {

    try {

        const event = await Event.findById( req.params.id );

        if ( !event ) {
            return res.status(404).send( successFalse( 'There is no an event with this id' ) )
        }
        if ( event.user.toString() !== req.uid ) {
            return res.status(401).send( successFalse( 'You have no access to update this event' ) );
        }

        const newEvent = {
            ...req.body,
            user: req.uid,
        };

        const eventUpdated = await Event.findByIdAndUpdate( req.params.id, newEvent, { new: true } );

        res.send( successTrue( eventUpdated ) );

    } catch (e) {

        console.log(e);
        res.status(500).send( successFalse('Server error') )

    }

};

const deleteEvent = async ( req, res ) => {

    try {

        const event = await Event.findById( req.params.id );

        if ( !event ) {
            return res.status(404).send( successFalse('There is no an event with this id') );
        }

        if ( event.user.toString() !== req.uid ) {
            return res.status(401).send( successFalse('You have no access to delete this event' ) );
        }

        await Event.findByIdAndDelete( req.params.id );

        res.send( successTrue('Event deleted successfully') );

    } catch (e) {

        console.log(e);
        res.status(500).send( successFalse('Server error') )

    }

};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};