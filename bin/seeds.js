require("dotenv").config();
require("../config/mongodb");
const sneakerModel = require("../models/Sneaker")
const mongoose = require("mongoose");
const seedSneakers = [
    {
        name: 'Jordan Retro 1',
        ref: 'NV23491',
        sizes: 43,
        description: 'OG',
        price: 123,
        category: 'Kids',
    },
    {
        name: 'Lebron 6',
        ref: 'NV23492',
        sizes: 43,
        description: 'OG',
        price: 123,
        category: 'Men',
    },
    {
        name: 'Kobe 8',
        ref: 'NV23493',
        sizes: 43,
        description: 'OG',
        price: 123,
        category: 'Women',
    },
    {
        name: 'KD 5',
        ref: 'NV23494',
        sizes: 43,
        description: 'OG',
        price: 123,
        category: 'Women',
    },
]
function seedDb(seedData) {
    sneakerModel.insertMany(seedData)
        .then(sneakers => console.log(sneakers))
        .catch(err => console.log(err))
}
seedDb(seedSneakers);