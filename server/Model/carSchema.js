const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  topSpeed: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: Object,
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
