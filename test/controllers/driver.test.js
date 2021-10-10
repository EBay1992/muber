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
      await request(app).post("/api/drivers").send({ email: "test@test.com" });
      const afterCount = await Driver.count();
      expect(afterCount - beforeCount).toBe(1);
    } catch (error) {
      console.log(error);
    }
  });

  test("put to an existing /api/drivers/id edits an existing driver", async () => {
    const driver = await Driver.create({ email: "beforePutRequest@test.com" });
    await request(app)
      .put(`/api/drivers/${driver._id}`)
      .send({ email: "afterPutRequest@test.com", driving: true });
    const updatedDriver = await Driver.findOne({ id: driver._id });
    expect(updatedDriver.email).toBe("afterPutRequest@test.com");
    expect(updatedDriver.driving).toBe(true);
  });

  test("delete to an existing /api/drivers/id delete the driver", async () => {
    const driver = await Driver.create({
      email: "driverbeforeDelete@test.com",
    });
    await request(app).delete(`/api/drivers/${driver._id}`);

    const deletedDriver = await Driver.findById(driver._id);
    expect(deletedDriver).toBe(null);
  });
});
