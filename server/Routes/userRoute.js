const express = require("express");

const router = express.Router();
const verifyUser = require("../Helper/verifyUser");
const {
  addCar,
  editCar,
  getCar,
  deleteCar,
  allUserCars,
  getUserById,
} = require("../Controllers/userController");

//middleware as verify user

router.post("/addcar", verifyUser, addCar);
router.post("/editcar/:id", verifyUser, editCar);
router.get("/getcar/:id", getCar);
router.get("/deletecar/:id", verifyUser, deleteCar);
router.get("/allcars/:id", allUserCars);
router.get("/getuserbyid/:id", getUserById);

module.exports = router;
