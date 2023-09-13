import { NextFunction, Request, Response } from "express";
import restaurantServices from "../services/restaurantServices";
import mongoose from "mongoose";

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

const getSingleRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurantId = new mongoose.Types.ObjectId(req.params.restaurantId);
    const result = await restaurantServices.getSingleRestaurant(restaurantId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllRestaurants,
  getSingleRestaurant,
};
