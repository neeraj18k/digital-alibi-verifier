const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user from DB
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ msg: "User not found" });

    req.user = user;   // ✅ NOW req.user._id exists
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token invalid" });
  }
};
