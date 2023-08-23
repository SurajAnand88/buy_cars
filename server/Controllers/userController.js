const Car = require("../Model/carSchema");
const User = require("../Model/userSchema");
const jwt = require("jsonwebtoken");

//Posting car to user inventory
const addCar = async (req, res) => {
  const {
    company,
    model,
    price,
    year,
    mileage,
    topSpeed,
    fuelType,
    power,
    color,
    image,
    additionalInfo,
  } = req.body;
  try {
    //finding car by model
    const car = await Car.findOne({ model });
    if (car) {
      return res.status(400).json({ message: "Car already exists" });
    }
    const user = await User.findById(req.user._id);
    const newCar = await Car.create({
      company,
      model,
      price,
      year,
      mileage,
      topSpeed,
      fuelType,
      power,
      color,
      image,
      owner: user._id,
      additionalInfo,
    });
    //pushing newCar id to user inventory
    user.inventory.push(newCar._id);
    await user.save();
    const { _id, name, email, inventory } = user;
    res.status(201).json({ newCar, user: { _id, name, email, inventory } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//edit user inventory car
const editCar = async (req, res) => {
  try {
    const {
      company,
      model,
      price,
      year,
      mileage,
      topSpeed,
      fuelType,
      power,
      color,
      image,
      additionalInfo,
    } = req.body;
    const car = await Car.findByIdAndUpdate(req.params.id, {
      company,
      model,
      price,
      year,
      mileage,
      topSpeed,
      fuelType,
      power,
      color,
      image,
      additionalInfo,
    });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get car details by id
const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete car from user inventory
const deleteCar = async (req, res) => {
  try {
    console.log(req.params.id);
    const car = await Car.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.user._id);
    const index = user.inventory.indexOf(car._id);
    user.inventory.splice(index, 1);
    await user.save();
    res.status(200).json({ message: "Car deleted successfully", car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//sending all car details from the id's of  users inventory
const allUserCars = async (req, res) => {
  try {
    //gettting all car details present in users inventory by id
    const user = await User.findById(req.params.id);
    const cars = await Car.find({ _id: { $in: user.inventory } });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const allCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCar,
  editCar,
  getCar,
  deleteCar,
  allUserCars,
  allCars,
  getUserById,
};
