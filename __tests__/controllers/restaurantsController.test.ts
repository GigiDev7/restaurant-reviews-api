import restaurantsController from "../../controllers/restaurantsController";
import errorHandler from "../../middlewares/errorHandler";
import restaurantServices from "../../services/restaurantServices";
import mongoose from "mongoose";

jest.mock("../../services/restaurantServices");
jest.mock("mongoose");

const req: any = {
  body: {},
  query: {},
  params: { restaurantId: "restaurantId" },
};

const res: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((json: any) => json),
};

const next: any = jest.fn((err) => errorHandler(err, req, res, next));

describe("restaurant controller", () => {
  test("GET ALL RESTAURANTS SUCCESS: it should return array of restaurants", async () => {
    const restaurants: any = [{ _id: "1", reviews: [], name: "rest1" }];

    (restaurantServices.getRestaurants as jest.Mock).mockResolvedValue({
      results: restaurants,
      totalCount: 1,
    });

    await restaurantsController.getAllRestaurants(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ restaurants, totalCount: 1 });
  });

  test("GET SINGLE RESTAURANT SUCCESS: it should return a single restaurant", async () => {
    const restaurant = { _id: "1", reviews: [], name: "rest1" };

    (restaurantServices.getSingleRestaurant as jest.Mock).mockResolvedValue({
      restaurant,
      reviewMin: null,
      reviewMax: null,
    });

    await restaurantsController.getSingleRestaurant(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      restaurant,
      reviewMin: null,
      reviewMax: null,
    });
  });
});
