const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
        default: "passenger", // patron, admin, librarian
    },
    tokenURL: {
        type: String,
        required: false,
    },
    tempJourney: { startLocation: String, endLocation: String, duration: Number },
    journeys: [{ startLocation: String, endLocation: String, duration: Number, date: Date }]
});

module.exports = mongoose.model("users", userSchema);