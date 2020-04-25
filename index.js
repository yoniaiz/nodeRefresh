const request = require("postman-request");
const geocode = require("./geocode");
const getWeather = require("./weather");

const address = process.argv[2];
geocode(address, ({ error, lat, long }) => {
  if (error) {
    console.error(error);
  } else {
    getWeather(lat, long, (res) => console.log(res));
  }
});
