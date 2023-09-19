import supertest from "supertest";
import app from "../../../app";
import * as db from "../../mockDB/db";
import Review from "../../../models/reviews";
import jwt from "jsonwebtoken";
import User from "../../../models/user";
import Restaurant from "../../../models/restaurant";
import mongoose from "mongoose";

let token: string;

const reviewData = {
  comment: "comment",
  date: "2023-09-09",
  rating: 5,
};

const restaurantData = { name: "name", address: "address", imageUrl: "url" };

describe("review controller", () => {
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

  test("ADD REVIEW SUCCESS: it should add new review to db and return 201 status code", async () => {
    const restaurant = await Restaurant.create(restaurantData);

    const response = await supertest(app)
      .post("/api/review")
      .set("content-type", "application/json")
      .set("authorization", `Bearer ${token}`)
      .send({ ...reviewData, restaurantId: restaurant._id });

    expect(response.status).toBe(201);
  });

  test("ADD REVIEW ERROR: return 404 error if there is no restaurant", async () => {
    const response = await supertest(app)
      .post("/api/review")
      .set("content-type", "application/json")
      .set("authorization", `Bearer ${token}`)
      .send({ ...reviewData, restaurantId: new mongoose.Types.ObjectId() });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Restaurant not found");
  });
});
