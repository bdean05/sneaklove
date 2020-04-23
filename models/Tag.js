const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    label: String,
})

const User = mongoose.model("Tag", userSchema);

module.exports = Tag;