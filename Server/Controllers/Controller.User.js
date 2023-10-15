const User = require("../Models/User");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("secret");

exports.register = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const existantUser = await User.findOne({ email });
    if (existantUser)
      return res.status(400).send({ msg: "User already exists" });
    const newUser = new User({
      email,
      password,
    });
    var salt = await bc.genSalt(10);
    var hash = await bc.hash(password, salt);
    newUser.password = hash;
    await newUser.save();
    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, secret);
    res.status(200).send({
      token,
      user: {
        email: newUser.email,
        password: newUser.password,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) res.status(404).json({ msg: "Invalid email or password" });
    const isMatch = await bc.compare(password, user.password);
    if (!isMatch) res.status(401).json({ msg: "Invalid email or password" });
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, secret);
    res.status(200).send({
      token: token,
      _id: user._id,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    res.status(500).send(error.msg);
  }
};