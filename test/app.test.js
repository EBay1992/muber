const request = require("supertest");
const app = require("../app");

describe("the express app", () => {
  test("handles a Get request to '/api'", async () => {
    try {
      const { body, status } = await request(app).get("/api");
      expect(status).toBe(200);
      expect(body.hi).toBe("there");
    } catch (error) {
      console.log(error);
    }
  });
});
