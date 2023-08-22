const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const query = req.query;
  console.log(query);
});

module.exports = router;
