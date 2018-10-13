var db = require("../models");


module.exports = function(app) {
    app.get("/", function(req, res) {
        db.Burger.findAll({}).then(function(dbBurger) {
            console.log(dbBurger);
            var hbsObject = {
                burgers: dbBurger
            };
            res.render("index", hbsObject);
        });
    });

    app.post("/api/burgers", function(req, res) {
        db.Burger.create({
            burger_name: req.body.name
        }).then(function(dbBurger) {
            res.json(dbBurger);
        });
    });

    app.put("/api/burgers/:id", function(req, res) {
        var devoured = req.body.devour;
        db.Burger.update({
            devoured: devoured
        },
        {
            where: {
                id: req.params.id
            }
        }).then(function(dbBurger) {
            if(dbBurger.changedRows === 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
    });

    app.delete("/api/burgers/:id", function(req, res){
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbBurger){
            res.json(dbBurger);
        });
    });
}