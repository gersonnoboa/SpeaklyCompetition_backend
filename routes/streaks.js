const express = require("express");
const router = express.Router({mergeParams: true});

const Streak = require("../data/schemas/streak");

router.get("/", async (req, res) => {
    const streaks = await Streak.find();
    res.send(streaks);
});

router.post("/", async (req, res) => {
    const streak = new Streak({
        name: req.body.name,
        streakDays: req.body.streakDays,
        words: req.body.words
    });

    const result = await streak.save();
    res.send(result);
});

module.exports = router;