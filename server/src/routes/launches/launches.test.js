const request = require("supertest");
const app = require("../../app");
describe("Test GET /Launches", () => {
  test("it should respond with 200 status code", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
    // expect(response.statusCode).toBe(200);
  });
});

describe("Test POST /Launches", () => {
  const completeLaunchData = {
    mission: "Uss Enterprises",
    rocket: "Ncc 1701-D",
    target: "kepler-186 f",
    launchDate: "January 28, 2030",
  };
  const completeLaunchDataWithoutDate = {
    mission: "Uss Enterprises",
    rocket: "Ncc 1701-D",
    target: "kepler-186 f",
  };

  const completeLaunchDataWithInvalidDate = {
    mission: "Uss Enterprises",
    rocket: "Ncc 1701-D",
    target: "kepler-186 f",
    launchDate: "Wow",
  };
  test("it should respond with 201 status code", async () => {
    const response = await request(app)
      .post("/Launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(completeLaunchDataWithoutDate);
  });

  test("it should catch missing requied properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      Error: "missing required launch property",
    });
  });

  test("it should catch invalid dates", async () => {
    const response = await request(app)
      .post("/Launches")
      .send(completeLaunchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      Error: "Invalid Launch Date",
    });
  });
});
