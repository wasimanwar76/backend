const express = require('express');
const { createShift, getAllShifts, deleteShift } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/shift', authMiddleware, adminMiddleware, createShift);
router.get('/shifts', authMiddleware, adminMiddleware, getAllShifts);
router.delete('/shift/:id', authMiddleware, adminMiddleware, deleteShift);

module.exports = router;

