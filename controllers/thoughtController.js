// Start of Code [Evan Towlerton]

const { Thought } = require('../models/thought');

const User = require('../models/user');


const thoughtController = {
    // Get all Thoughts //
    getAllThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .populate('thoughtText')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        )
    },


    // Get a single thought by ID //
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id found.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // Create a new thought //
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id } },
                    { new: true}
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this id found.' });
                    return;
                }
                res.json(dbUserData)
            })
    },


    // Update a thought by its ID //
    updateThoughtById(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((thought) =>
            !thought
                ? res.status(400).json({ message: 'No thought with this id found.' })
                : res.status(200).json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    },


    // Delete a thought by its ID //
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id found.' });
                }
                return User.findOneAndUpdate(
                    { username: params.username },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'thought successfully deleted' });
                    return;
                }
                res.json({ message: 'Thought successfully deleted', deleteThought: dbUserData });
            })
            .catch(err => res.json(err));
    },

    // Add a reaction to a thought //
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true}
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with this id found.' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },


    // Delete a reaction to a thought //
    deleteReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with this id found.' })
                : res.json(thought)
            )
                .catch((err) => res.status(500).json(err));
            }
}



module.exports = thoughtController;