import userController from "../../controllers/userController";
import userService from "../../services/userService";
import CustomError from "../../utils/customError";
import Errors from "../../utils/errorTypes";
import errorHandler from "../../middlewares/errorHandler";

jest.mock("../../services/userService");

const req: any = {
  body: {
    email: "user@example.com",
    password: "password",
  },
};

const res: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((json: any) => json),
};

const next: any = jest.fn((err) => errorHandler(err, req, res, next));

describe("user controller", () => {
  test("LOGIN SUCESS: it should return 200 status code", async () => {
    (userService.loginUser as jest.Mock).mockResolvedValue({});

    await userController.loginUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({});
  });

  test("LOGIN ERROR: it should go to error middleware", async () => {
    (userService.loginUser as jest.Mock).mockRejectedValue(
      new CustomError(Errors.InvalidCredentialsError, "Invalid credentials")
    );

    await userController.loginUser(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

  test("REGISTER SUCCESS: it should return 200 status code", async () => {
    (userService.registerUser as jest.Mock).mockResolvedValue({});

    await userController.registerUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully registered",
    });
  });

  test("REGISTER ERROR: it should go to error handling middleware", async () => {
    (userService.registerUser as jest.Mock).mockRejectedValue(
      new CustomError(Errors.UserExistsError, "User already exists")
    );

    await userController.registerUser(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "User already exists",
    });
  });
});
