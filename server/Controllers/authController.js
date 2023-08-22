const generateAccessToken = require("../Helper/generateAccessToken");
const User = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Registering user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //Hashing the password
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const { _id, name, email, inventory } = newUser;
    res
      .status(201)
      .json({
        user: { _id, name, email, inventory },
        message: "User register successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0NzhlNGY2ODMwNTA0NGQwMzBlNDMiLCJuYW1lIjoiU3VyYWoiLCJlbWFpbCI6ImFuYW5kQGdtYWlsLmNvbSIsImludmVudG9yeSI6W10sIl9fdiI6MCwiaWF0IjoxNjkyNjk1NzYxfQ.xk2o8e52-HNuS_cP9DMaqvwZ98hZmGy28X7ah_OhMYs

//Logining user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //select users email name and inventory only
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (isPasswordCorrect) {
        const token = await generateAccessToken(user.toJSON());
        const { _id, name, email, inventory } = user;
        res.status(200).json({ user: { _id, name, email, inventory }, token });
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
    const { _id, name, email, inventory } = user;
    res.status(200).json({ user: { _id, name, email, inventory } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, loggedInUser };
