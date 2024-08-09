const mongoose = require("mongoose");

module.exports.connect = async function () {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err);
    }
}