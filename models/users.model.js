const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    owner_name: String,
    email: String, //also it should be unique
    password: String,
    phone: String,
    age: Number,
    city: String
})
const UserModel = mongoose.model("users", UserSchema);
module.exports = {
    UserModel
}