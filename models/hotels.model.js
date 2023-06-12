const mongoose = require("mongoose");
const HotelSchema = mongoose.Schema({
    hotel_name: String,
    location: String,
    rating: Number,
    serve_food: Boolean
})
const HotelModel = mongoose.model("hotels", HotelSchema);
module.exports = {
    HotelModel
}