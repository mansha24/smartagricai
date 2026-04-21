const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, (req, res) => res.json({ message: 'Get equipment data' }));
router.post('/', authenticate, authorize('Farmer', 'Admin'), (req, res) => res.json({ message: 'Add equipment' }));

module.exports = router;
