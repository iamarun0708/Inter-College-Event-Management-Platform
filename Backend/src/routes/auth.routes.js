const express = require('express');
const router = express.Router();


const { registerUser, loginUser, updateUserProfile } = require('../controllers/auth.controller'); 
const { protect } = require('../middlewares/auth.middleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);


router.put('/profile', protect, updateUserProfile); 

module.exports = router;