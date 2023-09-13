import { NextFunction, Response, Request } from "express";
import reviewsService from "../services/reviewsService";
import mongoose from "mongoose";

const addReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = await reviewsService.addReview({
      comment: req.body.comment,
      date: req.body.date,
      rating: req.body.rating,
      restaurant: new mongoose.Types.ObjectId(req.body.restaurantId),
      user: new mongoose.Types.ObjectId(req.user!.id),
    });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.id);
    const reviewId = new mongoose.Types.ObjectId(req.params.reviewId);
    await reviewsService.deleteReview(userId, reviewId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export default {
  addReview,
  deleteReview,
};
