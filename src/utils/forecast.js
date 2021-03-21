const request = require("request");
const chalk = require("chalk");

const err = chalk.red;
const success = chalk.green;

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e990f5534eedce13d389974346541fca&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Connection is not possible", undefined);
    } else if (body.error) {
      callback("The data is incorrect", undefined);
    } else {
      const current = body.current;
      callback(undefined, `${current.weather_descriptions[0]} It is currently ${current.temperature} degrees out.It feels like ${current.feelslike} out.`);
    }
    console.log(body.current);
  });
};

module.exports = forecast;
