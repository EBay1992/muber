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

  test("Get to /api/drivers find drivers in a location", async () => {
    const seatteleDriver = await Driver.create({
      email: "seattleDrive@test.com",
      geometry: { type: "Point", coordinates: [-122.475, 47.614] },
    });
    const miamiDriver = await Driver.create({
      email: "miamiDriver@test.com",
      geometry: { type: "Point", coordinates: [-80.253, 25.791] },
    });
    const result = await request(app)
      .get("/api/drivers")
      .query({ lng: -80, lat: 25 });

    expect(result.body.length).toBe(1);
    expect(result.body[0].email).toBe("miamiDriver@test.com");
  });
});
