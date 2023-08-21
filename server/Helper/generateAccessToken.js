const jwt = require("jsonwebtoken");

async function generateAccessToken(user) {
  if (user.password) {
    delete user.password;
  }
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = generateAccessToken;
