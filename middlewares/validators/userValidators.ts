import { checkSchema } from "express-validator";

export const loginValidator = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Valid email address is required",
    },
  },
  password: {
    in: ["body"],
    errorMessage: "Password must be at least 8 characters long",
    isLength: { options: { min: 8 } },
  },
});

export const registerValidator = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Valid email address is required",
    },
    trim: true,
  },
  password: {
    in: ["body"],
    errorMessage: "Password must be at least 8 characters long",
    isLength: { options: { min: 8 } },
  },
  firstname: {
    in: ["body"],
    errorMessage: "Please provide your first name",
    exists: true,
    trim: true,
  },
  lastname: {
    in: ["body"],
    errorMessage: "Please provide your last name",
    exists: true,
    trim: true,
  },
});
