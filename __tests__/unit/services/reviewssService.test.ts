import Review from "../../../models/reviews";
import Restaurant from "../../../models/restaurant";
import reviewsService from "../../../services/reviewsService";

jest.mock("../../../models/reviews");
jest.mock("../../../models/restaurant");

const review = {
  comment: "comment",
  date: new Date(),
  rating: 5,
  restaurant: "restaurantId" as any,
  user: "userId" as any,
  deleteOne: jest.fn(),
};

describe("review services", () => {
  test("CREATE REVIEW SUCCESS: it should create new review and return it", async () => {
    (Restaurant.findById as jest.Mock).mockResolvedValue({
      reviews: [],
      save: jest.fn(),
    });
    (Review.create as jest.Mock).mockResolvedValue(review);

    const result = await reviewsService.addReview(review);

    expect(result).toEqual(review);
  });

  test("CREATE REVIEW ERROR: it should throw error if restaurants is not found", async () => {
    (Review.create as jest.Mock).mockResolvedValue(review);

    try {
      await reviewsService.addReview(review);
    } catch (error: any) {
      expect(error.message).toEqual("Restaurant not found");
    }
  });

  test("DELETE REVIEW ERROR: it should throw error if user ids dont match", async () => {
    (Review.findById as jest.Mock).mockResolvedValue({
      ...review,
      user: { equals: jest.fn(() => false) },
    });
    (Restaurant.findById as jest.Mock).mockResolvedValue({});

    try {
      await reviewsService.deleteReview(review.user, review.restaurant);
    } catch (error: any) {
      expect(error.message).toEqual("Authorization error");
    }
  });

  test("DELET REVIEW SUCCESS: it should delete existing review", async () => {
    (Review.findById as jest.Mock).mockResolvedValue({
      ...review,
      user: { equals: jest.fn(() => true) },
    });
    (Restaurant.findById as jest.Mock).mockResolvedValue({
      reviews: [],
      save: jest.fn(),
    });

    await reviewsService.deleteReview(review.user, review.restaurant);

    expect(review.deleteOne).toHaveBeenCalled();
  });
});
