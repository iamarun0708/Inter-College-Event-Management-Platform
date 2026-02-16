const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword } = require('../controllers/auth.controller');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

module.exports = router;
=======


const { registerUser, loginUser, updateUserProfile } = require('../controllers/auth.controller'); 
const { protect } = require('../middlewares/auth.middleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);


router.put('/profile', protect, updateUserProfile); 

module.exports = router;
>>>>>>> origin/dev-varshini
