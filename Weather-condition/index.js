import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_KEY = "bc42e8c496f46f314a07a5244e2308bd";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

let info;

app.post("/loc", async (req, res) => {
  console.log(req.body);
  let { lat, lon } = req.body;
  try {
    const location = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    console.log("location load successfully!");

    const forecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    console.log("forecast load successfully!" );


    let {
      name,
      sys: { country },
      weather: [{ main, description, icon}],
      main: { temp, humidity },
      wind: { speed },
      clouds: {all},
    } = location.data;
    

    info = {
      name,
      country,
      icon,
      mainWeather: main,
      weatherDesc: description,
      temp,
      windSpeed: speed,
      humidity,
      cloudiness: all,
    };

    console.log(info.name);
    
    info.list = forecast.data.list;
    console.log(info);


    /** Test data */
    // info = {
    //   name: "Downtown Toronto",
    //   country: "CA",
    //   icon: "04n",
    //   mainWeather: "Cloud",
    //   weatherDesc: "overcast clouds",
    //   temp: 22.64,
    //   windSpeed: 3.6,
    //   humidity: 68,
    //   cloudiness: 50,
    // };

    res.render("index.ejs", { info });
  } catch (error) {
    res.status(404).send("Cannot Find the Location");
  }
});

app.listen(port, () => {
  console.log("Server starts at the port: " + port);
});
