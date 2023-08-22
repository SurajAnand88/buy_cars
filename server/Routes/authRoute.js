const express = require("express");
const {
  registerUser,
  loginUser,
  loggedInUser,
} = require("../Controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/loggedInUser", loggedInUser);

module.exports = router;
