const express = require('express');
const router = express.Router();
const {
    registerForEvent,
    getMyRegistrations,
    getEventRegistrations,
    updateRegistrationStatus
} = require('../controllers/registration.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.post('/', protect, authorize('student'), registerForEvent);
router.get('/my', protect, authorize('student'), getMyRegistrations);
router.get('/event/:eventId', protect, authorize('college_admin', 'super_admin'), getEventRegistrations);
router.put('/:id', protect, authorize('college_admin', 'super_admin'), updateRegistrationStatus);

module.exports = router;
