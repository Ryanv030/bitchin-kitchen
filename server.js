
var express = require("express");
var bodyParser = require("body-parser");

require('dotenv').config();
const cmd = require('node-cmd');

var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
// app.use(express.static("public"));


// Routes go Here
require("./routes/react-route.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  cmd.run(`psql -U ${process.env.DB_USER} ebdb < db/seeds.sql`)
  app.listen(8080, function() {
    console.log("App listening on PORT " + PORT);
  });
});
