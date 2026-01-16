const express = require('express');
const router = express.Router();
const { getStats, purchaseCredits } = require('../controllers/statsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getStats);
router.post('/purchase-credits', protect, purchaseCredits);

module.exports = router;
