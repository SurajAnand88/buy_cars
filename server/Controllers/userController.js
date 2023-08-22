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
      additionalInfo,
    });
    const user = req.user;
    //pushing newCar id to user inventory
    user.inventory.push(newCar._id);
    await user.save();

    res.status(201).json({ newCar, user });
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
    const car = await Car.findByIdAndDelete(req.params.id);
    const user = req.user;
    const index = user.inventory.indexOf(car._id);
    user.inventory.splice(index, 1);
    await user.save();
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//sending all car details from the id's of  users inventory
const getAllCars = async (req, res) => {
  try {
    //getting all cars by id from users inventory array
    const cars = req.user.inventory.map(async (id) => await Car.findById(id));
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCar,
  editCar,
  getCar,
  deleteCar,
  getAllCars,
};
