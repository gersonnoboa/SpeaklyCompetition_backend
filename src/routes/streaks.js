const express = require("express");
const router = express.Router({mergeParams: true});

const Streak = require("../data/schemas/streak");
const dateHelper = require("../general/date-helper");

router.get("/", async (req, res) => {
    const streaks = await Streak.find();
    res.send(streaks);
});

router.get("/week", async(req, res) => {
    const week = dateHelper.getWeek(new Date());

    Streak.aggregate([
        { $match: { 
            date: {
                $gte: week.start,
                $lte: week.end
        }}},
        { $group: { 
            _id: "$name", 
            words: { $sum: "$words" },
            lastWords: { $last: "$words" },
            bestStreak: { $max: "$streakDays" },
            currentStreak: { $last: "$streakDays" },
            lastUpdated: { $last: "$date" },
        }}
    ])
    .sort({ words: -1})
    .then(result => {
        res.send(result);
    });
});

router.post("/", async (req, res) => {
    const streak = new Streak({
        name: req.body.name.toLowerCase(),
        streakDays: req.body.streakDays,
        words: req.body.words,
        date: req.body.date
    });

    try {
        const result = await streak.save();
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;