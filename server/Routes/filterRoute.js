const express = require("express");
const { filterCars } = require("../Controllers/filterController");

const router = express.Router();

router.get("/", filterCars);

module.exports = router;
