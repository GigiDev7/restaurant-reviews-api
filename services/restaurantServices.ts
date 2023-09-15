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
      $lookup: {
        from: "reviews",
        localField: "reviews",
        foreignField: "_id",
        as: "reviews",
        pipeline: [
          {
            $unset: ["__v"],
          },
        ],
      },
    },
    {
      $set: { averageRating: { $avg: "$reviews.rating" } },
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
  const restaurant = await Restaurant.aggregate([
    {
      $match: { _id: restaurantId },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "reviews",
        foreignField: "_id",
        as: "reviews",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
              pipeline: [
                {
                  $unset: ["__v", "password"],
                },
              ],
            },
          },
          {
            $unset: ["__v"],
          },
          {
            $sort: { date: -1 },
          },
        ],
      },
    },
    {
      $set: { averageRating: { $avg: "$reviews.rating" } },
    },
  ]);

  if (!restaurant.length) {
    throw new CustomError(Errors.NotFoundError, "Restaurant not found");
  }

  let reviewMin = null;
  let reviewMax = null;

  if (restaurant[0].reviews.length > 2) {
    reviewMin = await Review.find({ restaurant: restaurantId }, "-__v")
      .sort({ rating: 1 })
      .limit(1)
      .populate("user", "-password -__v");

    reviewMax = await Review.find({ restaurant: restaurantId }, "-__v")
      .sort({ rating: -1 })
      .limit(1)
      .populate("user", "-password -__v");
  }

  return {
    restaurant: restaurant[0],
    reviewMax: reviewMax ? reviewMax[0] : null,
    reviewMin: reviewMin ? reviewMin[0] : null,
  };
};

export default {
  getRestaurants,
  getSingleRestaurant,
};
