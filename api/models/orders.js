const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    
    name:String,
    price:String

});


module.exports = mongoose.model("orders",orderSchema );