const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  location: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  city: {
    type: String,
    default: "",
  },

  state: {
    type: String,
    default: "",
  },

  country: {
    type: String,
    default: "",
  },

  price: {
    type: Number,
    default: 0,
  },

  priceType: {
    type: String,
    enum: ["real", "demo"],
    default: "real",
  },

  images: {
    type: [String],
    default: [],
  },

  hotelId: {
    type: String,
    unique: true,
    sparse: true,
  },

  propertyType: {
    type: String,
    default: "",
  },

  hotelCategory: {
    type: String,
    default: "",
  },

  starRating: {
    type: Number,
    default: 0,
  },

  guestRecommendation: {
    type: Number,
    default: 0,
  },

  reviewCount: {
    type: Number,
    default: 0,
  },

  reviewRating: {
    type: Number,
    default: 0,
  },

  roomCount: {
    type: Number,
    default: 0,
  },

  roomArea: {
    type: String,
    default: "",
  },

  roomType: {
    type: String,
    default: "",
  },

  hotelFacilities: {
    type: [String],
    default: [],
  },

  roomFacilities: {
    type: [String],
    default: [],
  },

  additionalInfo: {
    type: String,
    default: "",
  },

  latitude: {
    type: Number,
    default: null,
  },

  longitude: {
    type: Number,
    default: null,
  },

  locality: {
    type: String,
    default: "",
  },

  pointsOfInterest: {
    type: [String],
    default: [],
  },

  similarHotels: {
    type: [String],
    default: [],
  },

  sourceUrl: {
    type: String,
    default: "",
  },

  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  bookedDates: [
    {
      start: Date,
      end: Date,
    },
  ],
});

module.exports = mongoose.model("Listing", listingSchema);
