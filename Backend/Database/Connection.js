const mongoose = require('mongoose');

const Connection = async () => {
    try {
        await mongoose.connect('mongodb+srv://eComm:123@cluster0.o2vne.mongodb.net/AdminDB?retryWrites=true&w=majority');
        console.log('MongoDB Connected to AdminDB');
    } catch (error) {
        console.error(error);
    }
};

module.exports = Connection;
