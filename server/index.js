const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const connect = require("./Helper/connectDatabase");

const authRouter = require("./Routes/authRoute");

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connect();
});
