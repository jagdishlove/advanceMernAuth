const User = require("../models/Users");

exports.register = (req, res, next) => {
  const { name, email, password } = req.body;
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

  // if (email === user.email) {
  //   return res.status(400).json({
  //     error: "Email already exists",
  //   });
  // }
  user.save();
  res.status(201).json({ success: true, message: "User created successfully" });
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

    res.status(200).json({ success: true, token: "dsfdst5rff" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
