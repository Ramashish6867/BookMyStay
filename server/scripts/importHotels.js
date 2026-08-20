const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const Listing = require("../models/Listing");

const CSV_PATH = path.join(__dirname, "hotels.csv");

function parseNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function parseList(value) {
  if (!value || value === "null") {
    return [];
  }

  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function generateDemoPrice(stars, propertyType, hotelCategory) {
  const star = Number(stars) || 0;

  let basePrice;

  switch (star) {
    case 5:
      basePrice = 6000;
      break;
    case 4:
      basePrice = 4000;
      break;
    case 3:
      basePrice = 2500;
      break;
    case 2:
      basePrice = 1800;
      break;
    default:
      basePrice = 1200;
  }

  const type = `${propertyType || ""} ${hotelCategory || ""}`.toLowerCase();

  if (type.includes("resort")) {
    basePrice += 800;
  }

  if (type.includes("guest house")) {
    basePrice -= 300;
  }

  return Math.max(basePrice, 800);
}

async function importHotels() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const hotels = [];

    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on("data", (row) => {
        // Skip invalid / empty records
        if (
          !row.property_id ||
          !row.property_name ||
          row.property_name.trim() === ""
        ) {
          return;
        }

        hotels.push({
          hotelId: row.property_id.trim(),

          title: row.property_name.trim(),

          description: row.hotel_description || "",

          location: row.city || "",

          address: row.address || "",

          city: row.city || "",

          state: row.state || row.province || "",

          country: row.country || "",

          price: generateDemoPrice(
            row.hotel_star_rating,
            row.property_type,
            row.hotel_category,
          ),

          priceType: "demo",

          images: [],

          propertyType: row.property_type || "",

          hotelCategory: row.hotel_category || "",

          starRating: parseNumber(row.hotel_star_rating),

          guestRecommendation: parseNumber(row.guest_recommendation),

          reviewCount: parseNumber(row.site_review_count),

          reviewRating: parseNumber(row.site_review_rating),

          roomCount: parseNumber(row.room_count),

          roomArea: row.room_area || "",

          roomType: row.room_type || "",

          hotelFacilities: parseList(row.hotel_facilities),

          roomFacilities: parseList(row.room_facilities),

          additionalInfo: row.additional_info || "",

          latitude: row.latitude ? parseNumber(row.latitude, null) : null,

          longitude: row.longitude ? parseNumber(row.longitude, null) : null,

          locality: row.locality || "",

          pointsOfInterest: parseList(row.point_of_interest),

          similarHotels: parseList(row.similar_hotel),

          sourceUrl: row.pageurl || "",

          hostId: null,

          bookedDates: [],
        });
      })
      .on("end", async () => {
        console.log(`CSV rows prepared: ${hotels.length}`);

        let inserted = 0;
        let updated = 0;

        for (const hotel of hotels) {
          const existing = await Listing.findOne({
            hotelId: hotel.hotelId,
          });

          if (existing) {
            await Listing.updateOne(
              { hotelId: hotel.hotelId },
              { $set: hotel },
            );

            updated++;
          } else {
            await Listing.create(hotel);
            inserted++;
          }
        }

        console.log(`Inserted: ${inserted}`);
        console.log(`Updated: ${updated}`);

        await mongoose.disconnect();

        console.log("Import completed.");
      });
  } catch (error) {
    console.error("Import failed:", error);
    process.exit(1);
  }
}

importHotels();
