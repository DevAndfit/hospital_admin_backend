const mongoose = require('mongoose');

const dbConnection = async () => {

    mongoose.connection.on('connected', () => console.log('connected'));
    mongoose.connection.on('open', () => console.log('open'));
    mongoose.connection.on('disconnected', () => console.log('disconnected'));
    mongoose.connection.on('reconnected', () => console.log('reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
    mongoose.connection.on('close', () => console.log('close'));

    try {
        await mongoose.connect(process.env.MONGO_URI);

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }

};

module.exports = {
    dbConnection
}



