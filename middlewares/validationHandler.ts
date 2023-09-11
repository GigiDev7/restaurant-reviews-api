import { validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

export default function validationHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json(errors);
  }
  next();
}
