const express = require("express");
const router = express.Router();

const {
  createProperty,
  getProperties,
  getMyProperties,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const upload = require("../middleware/upload");

// Create Property
router.post("/", upload.single("image"), createProperty);

// My Listings
router.get("/my", getMyProperties);

// All Properties
router.get("/", getProperties);

// Update Property
router.put("/:id", upload.single("image"), updateProperty);

// Delete Property
router.delete("/:id", deleteProperty);

module.exports = router;