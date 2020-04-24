const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



//Logged in user can Manage the catalog
router.get("/prod-manage", (req, res) => {
    Sneaker.find().then(dbRes => {
        res.render("products_manage.hbs", {
            sneakers: dbRes,
            msg: req.flash("msg"),
            
        })
    }).catch(dbErr => console.log(dbErr))

})

//Logged in user can Create

router.get("/prod-add", (req, res) => {
    res.render("products_add.hbs",{
        msg:req.flash("msg")
    })
})

router.post("/prod-add", upload.none(),(req, res) => {
    Sneaker.create(req.body)
        .then((dbResult) => {
            req.flash("msg", "Your sneaker has been created...");
            res.redirect("/prod-add");
        })
        .catch((dbErr) => {
            req.flash("msg", "An error occured while creating the sneaker");
            res.redirect("/prod-add");
        });
});

//Logged in user can Update

router.get("/prod-edit/:id", (req, res) => {
    Sneaker.findById(req.params.id).then(dbRes => {
        res.render("product_edit.hbs", {
            sneaker: dbRes
        })
    }).catch(dbErr => console.log(dbErr))

})

router.post("/prod-edit/:id", /*requireAuth,*/ (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);
    if (req.body.name === "" || req.body.ref === "" || req.body.size === "" || req.body.description === "" || req.body.price === "" || req.body.category === "") {
      req.flash("error", "Fill in everything please");
      res.redirect(`/prod-edit/${req.params.id}`);
    } else {
      Sneaker.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((dbResult) => {
          res.redirect("/prod-manage");
        })
        .catch((dbErr) => {
          console.log(dbErr);
        });
    }
  });

//Logged in user can Delete

router.get("/prod-delete/:id", (req, res) => {
    Sneaker.findByIdAndDelete(req.params.id).then(dbRes => {
        res.redirect("/prod-manage")
    }).catch(dbErr => console.log(dbErr))

})

module.exports = router;