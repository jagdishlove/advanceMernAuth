const express = require("express");
const router = express.Router();

const { register } = require("../controllers/auth");

router.route("/register").get(register);

module.exports = router;
