<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { addFeedback, getEventFeedback } = require('../controllers/feedback.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.post('/', protect, authorize('student'), addFeedback);
router.get('/:eventId', getEventFeedback);

module.exports = router;
=======
//dummy files just to prevent server crashing
const router = require('express').Router();
module.exports = router;
>>>>>>> origin/dev-varshini
