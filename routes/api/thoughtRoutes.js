const router = require('express').Router();









router.route('/')
    .get(getAllThoughts)
    .post(createThoughts)


router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThought)


router.route('/:thoughtId/reactions')
    .post(addReaction)


router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)


module.exports = router;