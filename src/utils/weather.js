const request = require("postman-request");
const weatherUrl = "http://api.weatherstack.com/current";
const weatherKey = "1eac76ab36fca216a55910834e0bf3e6";

const getWeather = (lat, long, callback) => {
  request(
    {
      url: `${weatherUrl}?access_key=${weatherKey}&query=${lat},${long}`,
      json: true,
    },
    (error, response, body) => {
      if (!error && response && response.statusCode === 200) {
        const { name, country, region } = body.location;
        const { temperature, weather_descriptions, feelslike } = body.current;
        console.log(body.current);
        callback({
          place: `${name}, ${region}, ${country}`,
          podcast: `the current temperature is ${temperature} but feels like ${feelslike} \n ${weather_descriptions[0]}`,
        });
      } else {
        callback({ error });
      }
    }
  );
};

module.exports = getWeather;
