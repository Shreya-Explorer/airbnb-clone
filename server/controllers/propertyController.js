const Property = require("../models/Property");

// Create Property
const createProperty = async (req, res) => {
  try {
    const { title, location, price, description, owner } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const property = await Property.create({
      title,
      location,
      price,
      description,
      image: req.file ? req.file.path : undefined,
      owner,
    });

    res.status(201).json({
      message: "Property added successfully",
      property,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Properties (Search + Price Filter)
const getProperties = async (req, res) => {
  try {
    const search = req.query.search || "";
    const maxPrice = req.query.maxPrice;

    let query = {
      location: {
        $regex: search,
        $options: "i",
      },
    };

    if (maxPrice) {
      query.price = {
        $lte: Number(maxPrice),
      };
    }

    const properties = await Property.find(query);

    res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get My Listings
const getMyProperties = async (req, res) => {
  try {
    const owner = req.query.owner;

    const properties = await Property.find({
      owner,
    });

    res.json(properties);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Property
const updateProperty = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      description: req.body.description,
    };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Property
const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);

    res.json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getMyProperties,
  updateProperty,
  deleteProperty,
};