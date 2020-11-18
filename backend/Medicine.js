const mongoose = require('mongoose');

const Medicine = new mongoose.Schema({
    store:{type: String},
    name: { type: String },
    description: { type: String },
    prescription: { type: String },
    instock: { type: Boolean },

});
module.exports = mongoose.model("Medicine", Medicine);