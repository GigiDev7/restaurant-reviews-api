import { Request, Response, NextFunction } from "express";
import Errors from "../utils/errorTypes";

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    err?.name === Errors.AuthenticationError ||
    err?.name === Errors.AuthorizationError
  ) {
    return res.status(401).json({ message: err.message });
  } else if (err?.name === Errors.InvalidCredentialsError) {
    return res.status(401).json({ message: err.message });
  } else if (err?.name === Errors.NotFoundError) {
    return res.status(404).json({ message: err.message });
  } else if (err?.name === Errors.UserExistsError) {
    return res.status(409).json({ message: err.message });
  } else {
    return res
      .status(500)
      .json({ message: err.message || "Something went wrong" });
  }
}
