const express = require('express');
const { getUser, getUsers, deleteUser, updateUser, createUser} = require('../controllers/users');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Roles = require('../utils/roles');
const router = express.Router({mergeParams: true});

router.use(protect);
router.use(authorize(Roles.ADMIN));

router.route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;