const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, (req, res) => res.json({ message: 'Get irrigation data' }));
router.post('/', authenticate, authorize('Farmer', 'Admin'), (req, res) => res.json({ message: 'Create irrigation schedule' }));

module.exports = router;
