// Start of Code [Evan Towlerton]

const User = require('../models/user');

const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find()
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => {
            console.log( { message: err } )
            res.status(500).json(err)
        });
    },

    // Get a user by id //
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },

    // Create a new user //
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    // Update a user by id //
    updateUserById(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with that id' });
                }
                return res.json(dbUserData)
            })
            .catch((err) => res.status(500).json(err));
    },

    // Delete a user by id //
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((deletedUser) =>
                !deletedUser ? res.status(404).json({ message: 'No user found with this id' })
                : User.findOneAndUpdate(
                    { users: req.params.userId },
                    { $pull: { users: req.params.userId } },
                    { new: false }
                )
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No use found with this id' })
                    return;
                }
                res.json('Successfully deleted user.');
            })
            .catch(err => res.json(err));
    },

    // Create a friend //
    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true}
        )
        .then((user) => {
            !user
            ? res.status(404).json({ message: "No user with that id found" })
            : res.status(200).json(user)
        })
        .catch((err) => res.status(500).json(err))
    },

    // Delete a friend //
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) => {
            !user
            ? res.status(404).json({ message: "No user found with that id" })
            : res.status(200).json(user)
        })
        .catch((err) => res.status(500).json(err))
    }
};

module.exports = userController;