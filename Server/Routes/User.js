const express = require("express");
const { register, login } = require("../Controllers/Controller.User");
const auth = require("../Middlewares/auth");
const { registerRules, validator } = require("../Middlewares/validator");
const router = express.Router();

router.post("/register", registerRules(), validator, register);
router.post("/login", login);


module.exports = router;