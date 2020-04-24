const express = require("express");
const router = new express.Router();
const User = require("../models/User");


const bcrypt = require("bcrypt");


router.get("/signin", (req, res) => {
  res.render("signin.hbs", {
    msg: req.flash("msg"),
  });
});


router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((foundUser) => {
      if (!foundUser) {
        req.flash("msg", "Invalid credentials....");
        res.redirect("/signin");
      } else {
        if (bcrypt.compareSync(password, foundUser.password)) {
          req.session.currentUser = foundUser;
          res.redirect("/");
        } else {
          req.flash("msg", "Invalid credentials...");
          res.redirect("/signin");
        }
      }
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});


router.get("/signup", (req, res) => {
  res.render("signup.hbs", {
    msg: req.flash("msg"),
  });
});



router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((foundUser) => {
      if (foundUser) {
        req.flash("msg", "The email is already taken...");
        res.redirect("/signup");
      } else {
        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = {
          email,
          password: hashedPassword,
        };
        if (req.file) {
          newUser = req.file.secure_url;
        }
        User.create(newUser)
          .then((createdUser) => {
            console.log("here");
            res.redirect("/signin");
          })
          .catch((dbErr) => {
            console.log(dbErr);
          });
      }
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});









module.exports = router;