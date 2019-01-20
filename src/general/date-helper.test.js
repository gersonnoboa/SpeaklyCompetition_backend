const dateHelper = require("./date-helper");

test("should get the correct start of the week", () => {
    let date = new Date(2019, 1, 15);
    let week = dateHelper.getWeek(date);

    expect(week.start).toEqual(new Date(2019, 0, 14));
});

test("should get the correct end of the week", () => {
    let date = new Date(2019, 1, 15);
    let week = dateHelper.getWeek(date);

    expect(week.end).toEqual(new Date(2019, 0, 20, 23, 59, 59, 999));
});