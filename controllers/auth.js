const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { successTrue, successFalse } = require('../services/standardResponcesService');
const { generateJWT } = require('../helpers/jwt');


const registerUser = async ( req , res) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).send( successFalse( 'This email already in use' ) );
        }

        user = new User( req.body );

        // Encrypt pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        // Generate JWT
        const token = await generateJWT( user.id, user.name );

        res.status(201).send( successTrue({ ...user._doc, token } ) );

    } catch (e) {

        console.log(e);
        res.status(500).send( successFalse( 'Server Error' ) );

    }
};


const login = async ( req, res ) => {

    const { password, email } = req.body;

    try {

        const user = await User.findOne({ email })
        if ( !user ) {
           return res.status(400).send( successFalse( 'The user with this email does not exist' ) );
        }

        // Confirm passwords
        const validPass = bcrypt.compareSync( password, user.password );

        if ( !validPass ) {
            return res.status(400).send( successFalse( 'Password is not valid' ) );
        }

        // Generate JWT
        const token = await generateJWT( user.id, user.name );

        res.status(200).send( successTrue({ ...user._doc, token } ) );
        
    } catch (e) {

        console.log(e);
        return res.status(500).send( successFalse( 'Server Error' ) );

    }

};


const renew = async ( req, res ) => {

    const { uid, name } = req;

    const token = await generateJWT( uid, name );

    res.send( successTrue( token ) );
};


module.exports = {
    registerUser,
    login,
    renew,
};
