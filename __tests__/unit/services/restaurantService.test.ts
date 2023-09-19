import restaurantServices from "../../../services/restaurantServices";
import Restaurant from "../../../models/restaurant";
import Review from "../../../models/reviews";

jest.mock("../../../models/restaurant");
jest.mock("../../../models/reviews");

const restaurantData = [
  { _id: "1", reviews: [], name: "rest 1" },
  { _id: "2", reviews: [], name: "rest 2" },
];

describe("restaurant services", () => {
  test("GET ALL RESTAURANTS SUCCESS: it should return array of restaurants", async () => {
    (Restaurant.aggregate as jest.Mock).mockResolvedValue(restaurantData);

    (Restaurant.countDocuments as jest.Mock).mockResolvedValue(2);

    const result = await restaurantServices.getRestaurants(1);

    expect(result).toEqual({
      results: restaurantData,
      totalCount: 2,
    });
  });

  test("GET SINGLE RESTAURANT SUCESS: it should return single restaurant data", async () => {
    (Restaurant.findById as jest.Mock).mockReturnThis();
    (Restaurant.populate as jest.Mock).mockResolvedValue(restaurantData[0]);

    const result = await restaurantServices.getSingleRestaurant("_id" as any);
    expect(result).toEqual({
      reviewMin: null,
      reviewMax: null,
      restaurant: restaurantData[0],
    });
  });
});
