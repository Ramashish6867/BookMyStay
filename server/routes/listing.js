const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

//Get Listings
router.get("/", async (req, res) => {
  try {
    const {
      location,
      city,
      minPrice,
      maxPrice,
      minStars,
      minRating,
      propertyType,
      sortBy,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};
 
    // Existing location filter
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    // City filter
    if (city) {
      filter.city = {
        $regex: city,
        $options: "i",
      };
    }

    // Price filter
     
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Hotel star filter
    if (minStars) {
      filter.starRating = {
        $gte: Number(minStars),
      };
    }

    // Guest rating filter
    if (minRating) {
      filter.reviewRating = {
        $gte: Number(minRating),
      };
    }

    // Property type filter
    if (propertyType) {
      filter.propertyType = {
        $regex: propertyType,
        $options: "i",
      };
    }

    // Sorting
    let sort = {};

    switch (sortBy) {
      case "rating":
        sort = { reviewRating: -1 };
        break;

      case "reviews":
        sort = { reviewCount: -1 };
        break;

      case "stars":
        sort = { starRating: -1 };
        break;

      case "priceLow":
        sort = { price: 1 };
        break;

      case "priceHigh":
        sort = { price: -1 };
        break;

      default:
        sort = { viewRank: 1 };
    }
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.min(Math.max(Number(limit), 1), 50);

    const skip = (pageNumber - 1) * limitNumber;
    const total = await Listing.countDocuments(filter);

    const listings = await Listing.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber);

    res.json({
      listings,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching listings",
    });
  }
});

router.get("/my-listing", auth, async (req, res) => {
  try {
    if (!req.user.isHost) {
      return res
        .status(403)
        .json({ message: "only host can view their listing " });
    }
    const listing = await Listing.find({ hostId: req.user.id });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching the listing" });
  }
});
//Get Listing by id

router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing Not Found" });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Listings" });
  }
});

//Post Listing by Host

router.post("/", auth, async (req, res) => {
  try {
    if (!req.user.isHost) {
      return res.status(403).json({
        message: "Only hosts can add listings",
      });
    }

    const { title, description, location, price, images = [] } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    if (!location?.trim()) {
      return res.status(400).json({
        message: "Location is required",
      });
    }

    if (
      price === undefined ||
      Number.isNaN(Number(price)) ||
      Number(price) <= 0
    )

     
     {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    const listing = new Listing({
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      price: Number(price),
      images: Array.isArray(images) ? images : [],
      hostId: req.user.id,
    });

    await listing.save();

    res.status(201).json(listing);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating listing",
    });
  }
});

//Put by host
router.put("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    if (listing.hostId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const { title, description, location, price, images } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        message: "Title cannot be empty",
      });
    }

    if (description !== undefined && !description.trim()) {
      return res.status(400).json({
        message: "Description cannot be empty",
      });
    }

    if (location !== undefined && !location.trim()) {
      return res.status(400).json({
        message: "Location cannot be empty",
      });
    }

    if (
      price !== undefined &&
      (Number.isNaN(Number(price)) || Number(price) <= 0)
    ) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (title !== undefined) listing.title = title.trim();
    if (description !== undefined) {
      listing.description = description.trim();
    }
    if (location !== undefined) listing.location = location.trim();
    if (price !== undefined) listing.price = Number(price);
    if (images !== undefined) {
      listing.images = Array.isArray(images) ? images : [];
    }

    await listing.save();

    res.json(listing);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating listing",
    });
  }
});

//Delete Listing by Host
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.hostId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await listing.deleteOne();
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting Listing" });
  }
});

module.exports = router;
