const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./databse/dbConnection");

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
  connection();
});
