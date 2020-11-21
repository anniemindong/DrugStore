const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load Store model
const Store = require("../../models/Store");

// @route POST api/stores/register
// @desc Register store
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Store.findOne({ email: req.body.email }).then(store => {
    if (store) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newStore = new Store({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStore.password, salt, (err, hash) => {
          if (err) throw err;
          newStore.password = hash;
          newStore
            .save()
            .then(store => res.json(store))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/stores/login
// @desc Login store and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find store by email
  Store.findOne({ email }).then(store => {
    // Check if store exists
    if (!store) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, store.password).then(isMatch => {
      if (isMatch) {
        // Store matched
        // Create JWT Payload
        const payload = {
          id: store.id,
          name: store.name
        };
        console.log(payload)

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              name: store.name,
              token: "Bearer " + token,
              
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
