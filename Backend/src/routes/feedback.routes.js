const express = require('express');
const router = express.Router();
const { addFeedback, getEventFeedback } = require('../controllers/feedback.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.post('/', protect, authorize('student'), addFeedback);
router.get('/:eventId', getEventFeedback);

module.exports = router;
