const express = require("express");
const router = new express.Router();


const bcrypt = require("bcrypt");


router.get("/signin", (req, res) => {
  res.render("signin.hbs", {
    error: req.flash("error"),
  });
});


router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then((foundUser) => {
            if (!foundUser) {
                req.flash("error", "Invalid credentials....");
                res.redirect("/signin");
            } else {
                if (bcrypt.compareSync(password, foundUser.password)) {
                    req.session.currentUser = foundUser;
                    res.redirect("/");
                } else {
                    req.flash("error", "Invalid credentials...");
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
    error: req.flash("error"),
  });
});



router.post("/signup", (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  //
  const { email, password } = req.body;
  // Check if user with that email already exists in the Database.
  User.findOne({ email: email })
    .then((foundUser) => {
      // If a user was found, it means the email is already used.
      if (foundUser) {
        req.flash("error", "The email is already taken...");
        res.redirect("/auth/signup");
      } else {
        // Hash the password !
        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = {
          email,
          password: hashedPassword,
        };

        if (req.file) {
          newUser.avatar = req.file.secure_url;
        }

        User.create(newUser)
          .then((createdUser) => {
            // User created !
            console.log("here");
            res.redirect("/auth/signin"); // Redirect to signin !
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
  // Destroys the session.
  // Makes the user logged out.
  req.session.destroy((err) => {
    res.redirect("/");
  });
});









module.exports = router;