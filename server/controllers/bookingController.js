const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const userId = req.query.user;

    const bookings = await Booking.find({
      user: userId,
    }).populate("property");

    res.json(bookings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
};