const request = require("request");
const chalk = require("chalk");

const err = chalk.red;

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmVycm9tMTk3OSIsImEiOiJja204MHNlNTQwZWZlMnZxZm9uODVyZzljIn0.8uJFXkaR6dcz9jRUC1AO-A&limit=1`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      return callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      return callback("This These parameters were not found", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
