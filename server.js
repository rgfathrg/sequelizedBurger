var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var db = require("./models");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);



db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App now listening at localhost:" + PORT);
    });
});