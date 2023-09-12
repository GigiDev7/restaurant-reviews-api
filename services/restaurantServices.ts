import Restaurant from "../models/restaurant";

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
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
              pipeline: [{ $unset: ["__v", "password"] }],
            },
          },
          {
            $unset: ["__v", "restaurantId", "userId"],
          },
          {
            $sort: { date: -1 },
          },
        ],
      },
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

export default {
  getRestaurants,
};
