const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, (req, res) => res.json({ message: 'Get smart recommendations' }));
router.post('/', authenticate, authorize('Agricultural Expert', 'Admin'), (req, res) => res.json({ message: 'Create recommendation' }));

module.exports = router;
