import express from "express";

var app = express();

const port = 3000;

app.get("/", (req, res) => {
    const today = new Date("June 24, 2023");

    let day = today.getDay();

    let type = "a weekday";
    let adv = "It is time to work hard"

    if (day === 0 || day === 6){
        type = "a weekend";
        adv = "It is time to relax";
    }

    res.render("index.ejs", {
        dayType: type,
        advice: adv
    })
})

app.listen(port, () => {
    console.log(`Server starting on port ${port}`);
})