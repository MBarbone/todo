const express = require("express");
const router = express.Router();
const User = require("../models/Users");

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send("User with that email already exists.");
    } else {
      user = new User({
        name,
        email,
        password,
      });

      await user.save();

      res.status(201);
      res.send("User created");
    }
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
