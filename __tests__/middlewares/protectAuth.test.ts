import jwt from "jsonwebtoken";
import User from "../../models/user";
import protectAuth from "../../middlewares/protectAuth";

jest.mock("jsonwebtoken");
jest.mock("../../models/user");

const reqWithoutJWT: any = { headers: {} };
const reqWithJWT: any = { headers: { authorization: "Bearer token" } };
const res: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((json: any) => json),
};
const next: any = jest.fn();

describe("protect auth middleware", () => {
  test("it should return 401 error if there is not jwt token in headers", async () => {
    await protectAuth(reqWithoutJWT, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Authentication Failed" });
  });

  test("it should go to next middleware if there is valid token", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: "userId" });
    (User.findById as jest.Mock).mockResolvedValue({
      _id: "userId",
      email: "email",
      firstname: "firstName",
      lastname: "lastName",
    });

    await protectAuth(reqWithJWT, res, next);

    expect(next).toHaveBeenCalled();
  });
});
