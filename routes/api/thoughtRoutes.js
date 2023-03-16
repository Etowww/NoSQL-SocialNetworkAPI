// Start of Code [Evan Towlerton]

const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought)


router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThought)


router.route('/:thoughtId/reactions')
    .post(addReaction)


router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)


module.exports = router;