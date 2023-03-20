const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN, {useNewUrlParser: true});

        console.log('DB online');

    } catch (e) {

        console.log(e);
        throw new Error('Error on the DB initialization');

    }

};

module.exports = { dbConnection };
