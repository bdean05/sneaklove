const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sneakerSchema = new Schema({
    name: String,
    ref: String,
    sizes: String,
    description: String,
    price:String,
    category:{
        type:String,
        enum:["Men", "Women", "Kids"]
    },
    id_tags:[{ type: Schema.Types.Object, ref: "Tag" }]
})

const Sneaker = mongoose.model("Sneaker", sneakerSchema)
module.exports = Sneaker;