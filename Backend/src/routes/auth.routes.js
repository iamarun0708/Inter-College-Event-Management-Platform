const express = require('express');
const router = express.Router();


const {
    registerUser,
    loginUser,
    updateUserProfile,
    forgotPassword,
    verifyOTP,
    resetPassword
} = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

router.put('/profile', protect, updateUserProfile);

module.exports = router;