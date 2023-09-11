import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";

export default async function protectAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
    return res.status(401).json({ message: "Authentication Failed" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decodedData as JwtPayload).id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Authentication Failed" });
    }
    req.user = {
      id: user._id.toString(),
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Authentication Failed" });
  }
}
