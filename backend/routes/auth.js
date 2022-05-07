const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Models
const User = require("../models/User");

const fetchUser = require("../middleware/fetchUser");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "jenilgajj@r";

// Route - 1: Create a user - '/api/auth/createUser'
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;

    // Check for the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // Check whether the user's email exists
    try {
      // Find a user through email
      let user = await User.findOne({ email: req.body.email });
      console.log(user);

      // If user already exists
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Please enter a unique email address!!" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      console.log(authToken);

      res.send({ success, authToken });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error!!" });
    }
  }
);

// Route - 2: Login a user - 'api/auth/login'
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    // Check for the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user through email
      let user = await User.findOne({ email });

      // If user does not exist
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please enter correct credentials" });
      }

      // Comparing login-password with the hashed password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please enter correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authToken: authToken });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error!!" });
    }
  }
);

// Route - 3: Get user details - 'api/auth/getUser'
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    res.send({ user: user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error!!" });
  }
});

module.exports = router;
