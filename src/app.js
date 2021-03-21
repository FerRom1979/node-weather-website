const path = require("path");
const express = require("express");
const chalk = require("chalk");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Fernando",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About mme",
    name: "Fernando",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Fernando",
    helpText: "this is a help page",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!! ",
    });
  }
  const cityName = req.query.address;
  geocode(cityName, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        Forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term ",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("pageNoFound", {
    message: "Help article not found",
    title: "Error Page",
    name: "Fernando",
  });
});

app.get("*", (req, res) => {
  res.render("pageNoFound", {
    errorMessage: "Page no Found",
    title: "Error Page",
    name: "Fernando",
  });
});
app.listen(3000, () => {
  console.log(chalk.yellow("Server on port 3000"));
});
