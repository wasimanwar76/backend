const express = require('express');
const { enrollInShift, getMySubscriptions } = require('../controllers/studentController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/enroll', authMiddleware, enrollInShift);
router.get('/subscriptions', authMiddleware, getMySubscriptions);

module.exports = router;
