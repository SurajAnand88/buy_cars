const generateAccessToken = require("../Helper/generateAccessToken");
const User = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Registering user

const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    var { name, email, password } = req.body;
    //finding user with email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    //Hashing the password
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const { _id, name: username, email: useremail, inventory } = newUser;
    res.status(201).json({
      user: { _id, username, useremail, inventory },
      message: "User register successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

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
