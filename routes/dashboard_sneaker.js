const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker")


//Logged in user can Manage the catalog
router.get("/prod-manage", (req,res)=>{
    Sneaker.find().then(dbRes=>{
        res.render("products_manage.hbs",{
            sneakers:dbRes
        })
    }).catch(dbErr => console.log(dbErr))
    
})

//Logged in user can Create

router.get("/prod-add", (req,res)=>{
    res.render("products_add.hbs")
})

//Logged in user can Update

router.get("/prod-edit/:id", (req,res)=>{
    Sneaker.findById(req.params.id).then(dbRes=>{
        res.render("product_edit.hbs",{
            sneaker:dbRes
        })
    }).catch(dbErr => console.log(dbErr))
    
})

//Logged in user can Delete

router.get("/prod-delete/:id", (req,res)=>{
    Sneaker.findByIdAndDelete(req.params.id).then(dbRes=>{
        res.redirect("product_edit.hbs")
    }).catch(dbErr => console.log(dbErr))
    
})

module.exports = router;
