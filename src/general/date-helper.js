const moment = require("moment");
const Week = require("../data/objects/week");

function getWeek(date) {
    let startDate = moment().startOf("isoWeek").toDate();
    let endDate = moment().endOf("isoWeek").toDate();

    let week = new Week(startDate, endDate);

    return week;
}

module.exports = {
    getWeek
}