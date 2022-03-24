const express = require("express");
const router = express.Router();
const Joi = require("joi");
const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.post(
  "/signin",
  passport.authenticate("local"),
  function (req, res, next) {
    if (req.err) {
      res.status(404).send({ message: "something went wrong" });
    } else {
      res.send(req.user);
    }
    next();
  }
);

router.post("/signout", function (req, res) {
  req.logout();
});

router.post("/register", async (req, res) => {
  const body = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(body);
  if (error) {
    res.send(error);
  } else {
    const newUser = new User({
      name: body.name,
      email: body.email,
      password: body.password,
      role: "USER",
    });
    bcrypt.hash(newUser.password, 10, async function (err, hash) {
      newUser.password = hash;
      const result = await newUser.save().catch((e) => res.status(500).send(e));
      res.send(req.newUser);
    });
  }
});

module.exports = router;
