const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../Models/User");
const secret = config.get("secret");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token == null) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ msg: "Unauthorized" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

module.exports = auth;