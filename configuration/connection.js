const mongoose = require('mongoose');
const { connect, connection } = require('mongoose')

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkapi_DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;