const request = require("supertest");
const app = require("../../app");
const Driver = require("../../model/Driver");
const mongoose = require("mongoose");
require("../../model/Driver");

describe("Drivers Controllers", () => {
  beforeAll(async () => {
    mongoose.connect("mongodb://localhost/muber-test");
  });
  beforeEach(async () => {
    try {
      const { drivers } = await mongoose.connection.collections;
      await drivers.drop();
    } catch (error) {
      console.log(error);
    }
  });
  afterAll(async () => {
    mongoose.disconnect();
  });
  test("Post a new driver", async () => {
    try {
      const beforeCount = await Driver.count();
      await request(app).post("/api/driver").send({ email: "test@test.com" });
      const afterCount = await Driver.count();
      expect(afterCount - beforeCount).toBe(1);
    } catch (error) {
      console.log(error);
    }
  });
});
