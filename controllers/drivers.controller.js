const Driver = require("../model/Driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  async CreateDriver(req, res, next) {
    try {
      const body = req.body;
      await Driver.create(body);
      res.status(201).send({ hi: "here" });
    } catch (error) {
      next(error);
    }
  },
};
