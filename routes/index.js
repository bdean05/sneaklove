const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.hbs"); 
});

router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.render("one-product.hbs");
});


module.exports = router;
