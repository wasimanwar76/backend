const express = require("express");
const {
  enrollInShift,
  getMySubscriptions,
  getShiftById,
} = require("../controllers/studentController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/enroll", authMiddleware, enrollInShift);
router.get("/subscriptions", authMiddleware, getMySubscriptions);
router.get("/shift/:id", authMiddleware, getShiftById);

module.exports = router;
