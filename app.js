const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {
  const cityname = req.body.location;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=metric&appid=8fc6d74e61f76d74a72f8a3cbd8627af#";
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {  //the data is converted into jason format.
      const weatherdata = JSON.parse(data);
      const icon = weatherdata.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The Tempearture in " + cityname + " is " + weatherdata.main.temp + " degree celcius.</h1>");
      res.write("<p>Weather description: " + weatherdata.weather[0].description + "</p>");
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });
});



app.listen(3000, function() {
  console.log("Server Has Started");
});
