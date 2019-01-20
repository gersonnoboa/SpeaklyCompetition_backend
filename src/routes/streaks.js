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

    const streaks = await Streak.find({
        date: {
            $gte: week.start,
            $lte: week.end
        }
    });

    res.send(streaks);
});

router.post("/", async (req, res) => {
    const streak = new Streak({
        name: req.body.name,
        streakDays: req.body.streakDays,
        words: req.body.words,
        date: req.body.date
    });

    const result = await streak.save();
    res.send(result);
});

module.exports = router;