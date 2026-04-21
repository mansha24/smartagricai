const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, (req, res) => res.json({ message: 'Get weather data' }));
router.get('/:location', authenticate, (req, res) => res.json({ message: `Get weather for ${req.params.location}` }));

module.exports = router;
