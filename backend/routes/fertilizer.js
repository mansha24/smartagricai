const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, (req, res) => res.json({ message: 'Get fertilizer data' }));
router.post('/', authenticate, authorize('Supplier', 'Admin'), (req, res) => res.json({ message: 'Add fertilizer' }));

module.exports = router;
