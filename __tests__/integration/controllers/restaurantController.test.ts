import supertest from "supertest";
import app from "../../../app";
import * as db from "../../mockDB/db";
import Restaurant from "../../../models/restaurant";
import jwt from "jsonwebtoken";
import User from "../../../models/user";

let token: string;

const restaurants = [{ name: "name", address: "address", imageUrl: "url" }];

describe("restaurant controller", () => {
  beforeAll(async () => {
    await db.connect();
  });

  beforeEach(async () => {
    const user = await User.create({
      email: "email",
      password: "password",
      firstname: "firstname",
      lastname: "lastname",
    });
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  test("GET ALL RESTAURANTS SUCCESS: it should return array of restaurants", async () => {
    await Restaurant.create(restaurants);

    const response = await supertest(app)
      .get("/api/restaurant")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.totalCount).toEqual(1);
    expect(response.body.restaurants).toHaveLength(1);
  });

  test("GET ALL RESTAURANTS ERROR: it should return auth error if there is not bearer token", async () => {
    await Restaurant.create(restaurants);

    const response = await supertest(app).get("/api/restaurant");

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Authentication Failed");
  });

  test("GET SINGLE RESTAURANT SUCCESS: it should find restaurant in db and return it", async () => {
    const restaurant = await Restaurant.create(restaurants[0]);

    const response = await supertest(app)
      .get(`/api/restaurant/${restaurant._id}`)
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
