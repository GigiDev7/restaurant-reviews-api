import supertest from "supertest";
import app from "../../../app";
import * as db from "../../mockDB/db";
import User from "../../../models/user";
import bcrypt from "bcrypt";

const userData = {
  email: "test3@gmail.com",
  password: "12345678",
  firstname: "test",
  lastname: "test",
};

describe("user controller", () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  test("REGISTER USER SUCCESS: it should create new user in db", async () => {
    const response = await supertest(app)
      .post("/api/user/signup")
      .set("content-type", "application/json")
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Successfully registered" });
  });

  test("REGISTER USER ERROR: it should return error if user already exists", async () => {
    await User.create(userData);

    const response = await supertest(app)
      .post("/api/user/signup")
      .set("content-type", "application/json")
      .send(userData);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: "User already exists" });
  });

  test("REGISTER USER ERROR: it should return error if there is invalid field", async () => {
    const response = await supertest(app)
      .post("/api/user/signup")
      .set("content-type", "application/json")
      .send({ ...userData, email: "email" });

    expect(response.status).toBe(403);
    expect(response.body.errors).not.toHaveLength(0);
  });

  test("LOGIN USER SUCCESS: it should find user in db and return it", async () => {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    await User.create({ ...userData, password: hashedPassword });

    const response = await supertest(app)
      .post("/api/user/signin")
      .set("content-type", "application/json")
      .send({ email: "test3@gmail.com", password: "12345678" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ email: "test3@gmail.com" })
    );
  });

  test("LOGIN ERROR: it should return invalid credentials error if user does not exist", async () => {
    const response = await supertest(app)
      .post("/api/user/signin")
      .set("content-type", "application/json")
      .send({ email: "test3@gmail.com", password: "12345678" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });
});
