const Router = require("express").Router;
const driversController = require("../controllers/drivers.controller");

const route = Router();
route.get("/", driversController.greeting);
route.post("/drivers", driversController.createDriver);
route.put("/drivers/:id", driversController.editDriver);
route.delete("/drivers/:id", driversController.deleteDriver);

module.exports = route;
