const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkapi_DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;