const Driver = require("../model/Driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  async createDriver(req, res, next) {
    try {
      const body = req.body;
      await Driver.create(body);
      res.status(201).send({ hi: "here" });
    } catch (error) {
      next(error);
    }
  },

  async editDriver(req, re, next) {
    try {
      const id = req.params.id;
      const body = req.body;

      const updatedDriver = await Driver.findByIdAndUpdate({ _id: id }, body, {
        new: true,
      });
      res.send(updatedDriver);
    } catch (error) {
      next(error);
    }
  },

  async deleteDriver(req, res, next) {
    try {
      const id = req.params.id;
      await Driver.findByIdAndDelete(id);
      res.status(204).send("the driver is deleted");
    } catch (error) {
      next(error);
    }
  },

  async indexDriver(req, res, next) {
    try {
      const area = {
        center: [req.query.lng, req.query.lat],
        radius: 20,
        unique: true,
      };
      const nearDrivers = await Driver.find({}).where("geometry").circle(area);

      res.send(nearDrivers);
    } catch (error) {
      next(error);
    }
  },
};
