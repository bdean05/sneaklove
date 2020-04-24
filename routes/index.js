const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker")
const Tag = require("../models/Tag")

router.get("/", (req, res) => {
  res.render("index.hbs");
});

router.get("/sneakers/:cat", (req, res) => {

  if (req.params.cat === "collection") {
    Sneaker.find().then(dbResult => {
      Tag.find().then(dbResTag => {
        res.render("products.hbs", {
          sneakers: dbResult,
          tags: dbResTag,
        })
      }).catch(dbErr => console.log(dbErr))
    }).catch(dbErr => console.log(dbErr))
  } else {
    Sneaker.find({
      category: req.params.cat
    }).then(dbResult => {
      res.render("products.hbs", {
        sneakers: dbResult
      })
    }).catch(dbErr => console.log(dbErr))

  }
});

router.get("/sneakers/collection/:id", (req, res) => {
  Sneaker.find({id_tags:[req.params.id]}).then(dbRes=>{
    res.render("products.hbs", {
      sneakers: dbRes
    })
  }).catch(dbErr => console.log(dbErr))
})

router.get("/one-product/:id", (req, res) => {
  Sneaker.findById(req.params.id).then(dbResult => {
    res.render("one-product.hbs", {
      sneaker: dbResult
    });
  }).catch(dbErr => console.log(dbErr))

});


module.exports = router;