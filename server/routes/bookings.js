const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

//create a new booking
router.post("/", auth, async (req, res) => {
  try {
    const { listingId, checkIn, checkOut } = req.body;

    if (!listingId || !checkIn || !checkOut) {
      return res.status(400).json({
        message: "Listing, check-in and check-out are required",
      });
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return res.status(400).json({
        message: "Invalid booking dates",
      });
    }

    if (endDate <= startDate) {
      return res.status(400).json({
        message: "Check-out must be after check-in",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      return res.status(400).json({
        message: "Check-in date cannot be in the past",
      });
    }

    const overlappingBooking = await Booking.findOne({
      listingId,
      checkIn: { $lt: endDate },
      checkOut: { $gt: startDate },
    });

    if (overlappingBooking) {
      return res.status(409).json({
        message: "This property is already booked for these dates",
      });
    }

    const booking = new Booking({
      listingId,
      userId: req.user.id,
      checkIn: startDate,
      checkOut: endDate,
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating booking",
    });
  }
});

router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate(
      "listingId",
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking" });
  }
});

//Get a single booking by thier id

router.get("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("listingId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "unauthorized" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking" });
  }
});

//Update the booking

router.put("/:id", auth, async (req, res) => {
  try {
    const { checkIn, checkOut } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        message: "Check-in and check-out are required",
      });
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return res.status(400).json({
        message: "Invalid booking dates",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      return res.status(400).json({
        message: "Check-in date cannot be in the past",
      });
    }

    if (endDate <= startDate) {
      return res.status(400).json({
        message: "Check-out must be after check-in",
      });
    }

    const overlappingBooking = await Booking.findOne({
      _id: { $ne: booking._id },
      listingId: booking.listingId,
      checkIn: { $lt: endDate },
      checkOut: { $gt: startDate },
    });

    if (overlappingBooking) {
      return res.status(409).json({
        message: "This property is already booked for these dates",
      });
    }

    booking.checkIn = startDate;
    booking.checkOut = endDate;

    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating booking",
    });
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.userId.toString() !== req.user.id)
      return res.status(403).json({
        message: "Unauthorized",
      });
    await Booking.deleteOne({ _id: req.params.id });
    res.json({ message: "Booking Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Booking" });
  }
});

module.exports = router;
