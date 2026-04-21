const express = require('express');
const router = express.Router();
const { getCrops, getCropById, createCrop, updateCrop, deleteCrop } = require('../controllers/cropController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, getCrops);
router.get('/:id', authenticate, getCropById);
router.post('/', authenticate, authorize('Farmer', 'Admin'), createCrop);
router.put('/:id', authenticate, updateCrop);
router.delete('/:id', authenticate, deleteCrop);

module.exports = router;
