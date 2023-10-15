const express = require("express");
const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("email", "this field should be a valid email").isEmail(),
  check("password", "This field should be at least 6 characters").isLength({
    min: 6,
  }),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  return errors.isEmpty()
    ? next()
    : res.status(400).json({ errors: errors.array() });
};