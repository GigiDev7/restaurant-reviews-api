import { checkSchema } from "express-validator";

export const reviewValidator = checkSchema({
  comment: {
    in: ["body"],
    errorMessage: "Please enter a comment for review",
    exists: true,
    trim: true,
  },
  rating: {
    in: ["body"],
    isFloat: {
      errorMessage: "Please enter a rating between 1 and 5",
      options: { min: 1, max: 5 },
    },
  },
  date: {
    isDate: {
      errorMessage: "Please provide a valid date",
    },
  },
  restaurantId: {
    isMongoId: {
      errorMessage: "Please provide a valid restaurant id",
    },
  },
});
