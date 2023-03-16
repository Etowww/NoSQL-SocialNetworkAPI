const router = require('express').Router();

router.route('/')
    .get(getAllUsers)
    .post(createUser)


router.route('/:userId')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUser)



router.route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend)



module.exports = router;