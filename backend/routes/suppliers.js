const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, (req, res) => res.json({ message: 'Get supplier marketplace' }));
router.post('/', authenticate, authorize('Supplier', 'Admin'), (req, res) => res.json({ message: 'Add supplier profile' }));

module.exports = router;
