import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.loginUser(req.body.email, req.body.password);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.registerUser(req.body);
    res.status(200).json({ message: "Successfully registered" });
  } catch (error) {
    next(error);
  }
};

export default {
  loginUser,
  registerUser,
};
