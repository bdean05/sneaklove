const express = require("express");
const router = new express.Router();


router.get("/signin", (req, res) => {
    res.render("signin.hbs");
})

router.get("/signup", (req, res) => {
    res.render("signup.hbs");
})

module.exports = router;