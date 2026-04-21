const Crop = require('../models/Crop');

// @desc    Get all crops
// @route   GET /api/crops
// @access  Private
const getCrops = async (req, res) => {
  try {
    let query = {};

    // Farmers can only see their own crops
    if (req.user.role === 'Farmer') {
      query.farmer = req.user._id;
    }

    const crops = await Crop.find(query).populate('farmer', 'name email');
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get crop by ID
// @route   GET /api/crops/:id
// @access  Private
const getCropById = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate('farmer', 'name email');

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Farmers can only view their own crops
    if (req.user.role === 'Farmer' && crop.farmer._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create crop
// @route   POST /api/crops
// @access  Private/Farmer
const createCrop = async (req, res) => {
  try {
    const crop = await Crop.create({
      ...req.body,
      farmer: req.user._id,
    });
    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update crop
// @route   PUT /api/crops/:id
// @access  Private
const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Farmers can only update their own crops
    if (req.user.role === 'Farmer' && crop.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedCrop = await Crop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete crop
// @route   DELETE /api/crops/:id
// @access  Private
const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Farmers can only delete their own crops
    if (req.user.role === 'Farmer' && crop.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Crop.findByIdAndDelete(req.params.id);
    res.json({ message: 'Crop removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
};
