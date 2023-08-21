const {
  default: generateAccessToken,
} = require("../Helper/generateAccessToken");
const User = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Registering user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = await User.create({ name, email, hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Logining user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        user.hashedPassword
      );
      if (isPasswordCorrect) {
        const token = await generateAccessToken(user);
        res.status(200).json({ user, token });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Checking loggedInUser
const loggedInUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authorization.split(" ")[1];
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, loggedInUser };
