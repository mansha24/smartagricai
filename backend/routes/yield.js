const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, (req, res) => res.json({ message: 'Get yield analytics' }));
router.post('/', authenticate, authorize('Farmer', 'Admin'), (req, res) => res.json({ message: 'Add yield data' }));

module.exports = router;
