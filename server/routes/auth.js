const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const Profile = require("../models/profile");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }
    // if (!name?.trim() || !email?.trim() || !password) {
    //   return res.status(400).json({
    //     message: "Name, email and password are required",
    //   });
    // }
    // if (password.length < 6) {
    //   return res.status(400).json({
    //     message: "Password must be at least 6 characters",
    //   });
    // }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const profile = new Profile({
      user: user._id,
      bio: "",
      phone: "",
      gender: "",
      dob: null,
      avatar: "",
      location: "",
    });
    await profile.save();

    const token = jwt.sign(
      {
        id: user._id,
        isHost: user.isHost,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating User" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const existingProfile = await Profile.findOne({
      user: user._id,
    });

    if (!existingProfile) {
      const profile = new Profile({
        user: user._id,
        bio: "",
        phone: "",
        gender: "",
        dob: null,
        avatar: "",
        location: "",
      });

      await profile.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        isHost: user.isHost,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        isHost: user.isHost,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login error",
    });
  }
});

module.exports = router;
