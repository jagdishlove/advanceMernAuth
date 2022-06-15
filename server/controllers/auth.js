const User = require("../models/Users");

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userCheck = await User.findOne({ email });
  if (userCheck) {
    return res.status(400).json({
      error: "User already exists",
    });
  }
  const user = new User({
    name,
    email,
    password,
  });

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Please provide all fields",
    });
  }
  try {
    user.save();
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
