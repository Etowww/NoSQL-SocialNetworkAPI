const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trimmed: true,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        trimmed: true,
        unique: true,
        required: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please submite a valid email address']
    },
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
},
{
    toJSON: {
        virtuals: true,
    }
}
);


const User = mongoose.model('user', userSchema);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})


module.exports = User