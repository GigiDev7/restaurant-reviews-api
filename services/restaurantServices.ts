import mongoose from "mongoose";
import Restaurant from "../models/restaurant";
import CustomError from "../utils/customError";
import Errors from "../utils/errorTypes";
import Review from "../models/reviews";

const getRestaurants = async (
  page: number,
  minRating?: string,
  maxRating?: string
) => {
  const limit = 6;
  const skip = (page - 1) * limit;
  let filters: any = {};
  if (minRating && maxRating) {
    filters.averageRating = { $gte: +minRating, $lte: +maxRating };
  }

  const totalCount = await Restaurant.countDocuments(filters);

  const results = await Restaurant.aggregate([
    {
      $match: filters,
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $unset: ["__v"],
    },
    {
      $sort: { averageRating: -1 },
    },
  ]);

  return { results, totalCount };
};

const getSingleRestaurant = async (restaurantId: mongoose.Types.ObjectId) => {
  const restaurant = await Restaurant.findById(restaurantId, "-__v").populate({
    path: "reviews",
    select: "-__v",
    options: { sort: { date: -1 } },
    populate: { path: "user", select: "-password -__v" },
  });
  if (!restaurant) {
    throw new CustomError(Errors.NotFoundError, "Restaurant not found");
  }

  let reviewMin = null;
  let reviewMax = null;

  if (restaurant.reviews.length > 1) {
    reviewMin = await Review.find({ restaurant: restaurantId }, "-__v")
      .sort({ rating: 1 })
      .limit(1)
      .populate("user", "-password -__v");

    reviewMax = await Review.find({ restaurant: restaurantId }, "-__v")
      .sort({ rating: -1 })
      .limit(1)
      .populate("user", "-password -__v");
  }

  return { restaurant, reviewMax, reviewMin };
};

export default {
  getRestaurants,
  getSingleRestaurant,
};
