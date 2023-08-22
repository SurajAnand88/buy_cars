//filtering cars using query
const Car = require("../Model/carSchema");

const filterCars = async (req, res) => {
  try {
    const { price, color, fuelType, company } = req.query;
    const cars = await Car.find({
      //if there is a company query then filter by company
      ...(company && { company }),
      //if there is a color query then filter by color
      ...(color && { color }),
      //if there is a fuelType query then filter by fuelType
      ...(fuelType && { fuelType }),
    }).sort({ price: price == "lth" ? "asc" : "desc" });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  filterCars,
};
