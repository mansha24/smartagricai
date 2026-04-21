const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

// Placeholder controllers - implement as needed
router.get('/', authenticate, (req, res) => res.json({ message: 'Get soil data' }));
router.post('/', authenticate, authorize('Farmer', 'Admin'), (req, res) => res.json({ message: 'Create soil record' }));

module.exports = router;
