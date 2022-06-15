const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ error: "You are not logged in" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: decoded.id });

    if (!user) {
      return res.status(401).json({ error: "No user found with this id" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Not authorized to access this route" });
  }
};
