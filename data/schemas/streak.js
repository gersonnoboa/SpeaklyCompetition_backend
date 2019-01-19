const mongoose = require("mongoose");
const streakSchema = mongoose.Schema({
    name: String,
    streakDays: Number,
    words: Number,
    date: {
        type: Date,
        default: new Date()
    }
});
const Streak = mongoose.model("Streak", streakSchema);

module.exports = Streak;