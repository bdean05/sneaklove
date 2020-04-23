const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    label: String,
})

const Tag = mongoose.model("Tag", userSchema);

module.exports = Tag;