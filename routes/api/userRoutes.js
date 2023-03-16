// Start of Code [Evan Towlerton]
const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUser,
    createFriend,
    deleteFriend
} = require('../../controllers/userController')

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