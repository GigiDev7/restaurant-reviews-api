import mongoose from "mongoose";
import Review from "../models/reviews";
import Restaurant from "../models/restaurant";
import CustomError from "../utils/customError";
import Errors from "../utils/errorTypes";

const addReview = async (reviewData: {
  user: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  comment: string;
  date: Date;
  rating: number;
}) => {
  const restaurant = await Restaurant.findById(reviewData.restaurant);
  if (!restaurant) {
    throw new CustomError(Errors.NotFoundError, "Restaurant not found");
  }

  const review = await Review.create(reviewData);
  restaurant.reviews.push(review._id);

  await restaurant.save();
  return review;
};

const deleteReview = async (
  userId: mongoose.Types.ObjectId,
  reviewId: mongoose.Types.ObjectId
) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new CustomError(Errors.NotFoundError, "Review not found");
  }

  if (!review.user.equals(userId)) {
    throw new CustomError(Errors.AuthorizationError, "Authorization error");
  }

  const restaurant = await Restaurant.findById(review.restaurant);
  if (!restaurant) {
    throw new CustomError(Errors.NotFoundError, "Restaurant not found");
  }

  restaurant.reviews = restaurant.reviews.filter(
    (rev) => !rev.equals(review._id)
  );

  await restaurant.save();
  await review.deleteOne();
};

export default {
  addReview,
  deleteReview,
};
