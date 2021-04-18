const express = require('express');
const { updateDetails, register, login, getMe, forgotPassword, resetPassword } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;