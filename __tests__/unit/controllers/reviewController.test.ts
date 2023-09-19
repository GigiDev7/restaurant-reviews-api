import reviewController from "../../../controllers/reviewController";
import errorHandler from "../../../middlewares/errorHandler";
import reviewsService from "../../../services/reviewsService";
import mongoose from "mongoose";
import CustomError from "../../../utils/customError";
import Errors from "../../../utils/errorTypes";

jest.mock("../../../services/reviewsService");
jest.mock("mongoose");

const req: any = {
  body: {
    comment: "comment",
    date: new Date(),
    rating: 5,
    restaurantId: "restaurantId",
  },
  user: {
    id: "userId",
  },
  params: {
    reviewId: "reviewId",
  },
};

const res: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((json: any) => json),
};

const next: any = jest.fn((err) => errorHandler(err, req, res, next));

describe("review controller", () => {
  test("ADD REVIEW SUCESS: it should return 201 status code", async () => {
    (reviewsService.addReview as jest.Mock).mockResolvedValue({});

    await reviewController.addReview(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({});
  });

  test("ADD REVIEW ERROR: it should go to error handling middleware", async () => {
    (reviewsService.addReview as jest.Mock).mockRejectedValue(
      new CustomError(Errors.NotFoundError, "Not found")
    );

    await reviewController.addReview(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Not found" });
  });

  test("DELETE REVIEW SUCCESS: it should return 204 status code", async () => {
    (reviewsService.deleteReview as jest.Mock).mockResolvedValue({});

    await reviewController.deleteReview(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  test("DELETE REVIEW ERROR: it should go to error handling middleware", async () => {
    (reviewsService.addReview as jest.Mock).mockRejectedValue(
      new CustomError(Errors.NotFoundError, "Not found")
    );

    await reviewController.deleteReview(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Not found" });
  });
});
