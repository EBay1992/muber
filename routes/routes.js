const Router = require("express").Router;
const driversController = require("../controllers/drivers.controller");

const route = Router();
route.get("/", driversController.greeting);
route.post("/driver", driversController.CreateDriver);

module.exports = route;
