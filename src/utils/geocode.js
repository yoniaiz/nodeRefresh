const request = require("postman-request");
const mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const mapBoxKey =
  "pk.eyJ1IjoieW9uaWFpeiIsImEiOiJjazlmaHZsdXUwYnlkM2Zqd2IxdDNpdThrIn0.ErCORvuDcn6o26IybiKU3w";

const geocode = (address, callback) => {
  request(
    {
      url: `${mapUrl}${encodeURIComponent(
        address
      )}.json?access_token=${mapBoxKey}`,
      json: true,
    },
    (error, response, body) => {
      try {
        if (!error && response && response.statusCode === 200) {
          const { place_name, center } = body.features[0];
          const [lat, long] = [center[1], center[0]];
          callback({ lat, long });
        } else {
          console.log(error);
          callback({ error });
        }
      } catch (error) {
        console.log(error)
        callback({ error: "sorry something went wrong" });
      }
    }
  );
};

module.exports = geocode;
