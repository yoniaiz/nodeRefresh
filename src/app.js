const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const getWeather = require("./utils/weather");

const app = express();

const publicPath = "../public";
const hbsPath = "/tamplates/";

// defint absolute path fot express condig
const publicDirPath = path.join(__dirname, publicPath);
const viewsDirPath = path.join(__dirname, `${publicPath}${hbsPath}/views`);
const partialsDirPath = path.join(__dirname, `${publicPath}${hbsPath}partials`);

// setup handelbars to express
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

//setup static derectory
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "title",
    name: "yoni",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "yoni",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    geocode(req.query.address, ({ error, lat, long }) => {
      if (error) {
        res.send({ error });
      } else {
        getWeather(lat, long, (data) =>
          res.send({ place: data.place, podcast: data.podcast })
        );
      }
    });
  } else {
    res.send({
      error: "no address provided",
    });
  }
});

app.get("/help", (req, res) => {
  res.render("about", {
    title: "help",
    name: "yoni",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("SERVER START");
});
