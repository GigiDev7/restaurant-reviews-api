"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reviews_1 = __importDefault(require("../../models/reviews"));
const restaurant_1 = __importDefault(require("../../models/restaurant"));
const reviewsService_1 = __importDefault(require("../../services/reviewsService"));
jest.mock("../../models/reviews");
jest.mock("../../models/restaurant");
const review = {
    comment: "comment",
    date: new Date(),
    rating: 5,
    restaurant: "restaurantId",
    user: "userId",
    deleteOne: jest.fn(),
};
describe("review services", () => {
    test("CREATE REVIEW SUCCESS: it should create new review and return it", () => __awaiter(void 0, void 0, void 0, function* () {
        restaurant_1.default.findById.mockResolvedValue({
            reviews: [],
            save: jest.fn(),
        });
        reviews_1.default.create.mockResolvedValue(review);
        const result = yield reviewsService_1.default.addReview(review);
        expect(result).toEqual(review);
    }));
    test("CREATE REVIEW ERROR: it should throw error if restaurants is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        reviews_1.default.create.mockResolvedValue(review);
        try {
            yield reviewsService_1.default.addReview(review);
        }
        catch (error) {
            expect(error.message).toEqual("Restaurant not found");
        }
    }));
    test("DELETE REVIEW ERROR: it should throw error if user ids dont match", () => __awaiter(void 0, void 0, void 0, function* () {
        reviews_1.default.findById.mockResolvedValue(Object.assign(Object.assign({}, review), { user: { equals: jest.fn(() => false) } }));
        restaurant_1.default.findById.mockResolvedValue({});
        try {
            yield reviewsService_1.default.deleteReview(review.user, review.restaurant);
        }
        catch (error) {
            expect(error.message).toEqual("Authorization error");
        }
    }));
    test("DELET REVIEW SUCCESS: it should delete existing review", () => __awaiter(void 0, void 0, void 0, function* () {
        reviews_1.default.findById.mockResolvedValue(Object.assign(Object.assign({}, review), { user: { equals: jest.fn(() => true) } }));
        restaurant_1.default.findById.mockResolvedValue({
            reviews: [],
            save: jest.fn(),
        });
        yield reviewsService_1.default.deleteReview(review.user, review.restaurant);
        expect(review.deleteOne).toHaveBeenCalled();
    }));
});
