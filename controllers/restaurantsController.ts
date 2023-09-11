import { NextFunction, Request, Response } from "express";
import restaurantServices from "../services/restaurantServices";

const getAllRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let page = 1;
    if (req.query.page) {
      page = +req.query.page;
    }
    const { results: restaurants, totalCount } =
      await restaurantServices.getRestaurants(
        page,
        req.query.minRating as string,
        req.query.maxRating as string
      );
    res.status(200).json({ totalCount, restaurants });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllRestaurants,
};
