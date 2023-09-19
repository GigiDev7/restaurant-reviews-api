import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../models/user";
import userService from "../../../services/userService";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../../models/user");

describe("user services", () => {
  test("REGISTER ERROR: it should throw error on registration", async () => {
    const userData = {
      firstname: "test",
      lastname: "test",
      email: "email@gmail.com",
      password: "12345678",
    };

    (bcrypt.genSalt as jest.Mock).mockResolvedValue(12);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
    (User.create as jest.Mock).mockImplementationOnce(() =>
      Promise.reject({ code: 11000 })
    );

    try {
      await userService.registerUser(userData);
    } catch (error: any) {
      expect(error.message).toEqual("User already exists");
    }
  });

  test("LOGIN SUCCESS: it should login user and return token", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      firstname: "test",
      lastname: "test",
      email: "email@gmail.com",
      password: "12345678",
      _id: "id",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("token");

    const result = await userService.loginUser("email", "password");

    expect(result).toEqual({
      firstname: "test",
      lastname: "test",
      email: "email@gmail.com",
      token: "token",
      _id: "id",
    });
  });

  test("LOGIN ERROR: it should throw error", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      firstname: "test",
      lastname: "test",
      email: "email@gmail.com",
      password: "12345678",
      _id: "id",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    (jwt.sign as jest.Mock).mockReturnValue("token");

    try {
      await userService.loginUser("email", "password");
    } catch (error: any) {
      expect(error.message).toEqual("Invalid email or password");
    }
  });
});
