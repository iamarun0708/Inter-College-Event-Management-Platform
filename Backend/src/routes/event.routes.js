const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/event.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.route('/')
    .get(getEvents)
    .post(protect, authorize('college_admin', 'super_admin'), createEvent);

router.route('/:id')
    .get(getEventById)
    .put(protect, authorize('college_admin', 'super_admin'), updateEvent)
    .delete(protect, authorize('college_admin', 'super_admin'), deleteEvent);

module.exports = router;
