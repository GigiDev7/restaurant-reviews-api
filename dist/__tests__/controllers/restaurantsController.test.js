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
const restaurantsController_1 = __importDefault(require("../../controllers/restaurantsController"));
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const restaurantServices_1 = __importDefault(require("../../services/restaurantServices"));
jest.mock("../../services/restaurantServices");
jest.mock("mongoose");
const req = {
    body: {},
    query: {},
    params: { restaurantId: "restaurantId" },
};
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((json) => json),
};
const next = jest.fn((err) => (0, errorHandler_1.default)(err, req, res, next));
describe("restaurant controller", () => {
    test("GET ALL RESTAURANTS SUCCESS: it should return array of restaurants", () => __awaiter(void 0, void 0, void 0, function* () {
        const restaurants = [{ _id: "1", reviews: [], name: "rest1" }];
        restaurantServices_1.default.getRestaurants.mockResolvedValue({
            results: restaurants,
            totalCount: 1,
        });
        yield restaurantsController_1.default.getAllRestaurants(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ restaurants, totalCount: 1 });
    }));
    test("GET SINGLE RESTAURANT SUCCESS: it should return a single restaurant", () => __awaiter(void 0, void 0, void 0, function* () {
        const restaurant = { _id: "1", reviews: [], name: "rest1" };
        restaurantServices_1.default.getSingleRestaurant.mockResolvedValue({
            restaurant,
            reviewMin: null,
            reviewMax: null,
        });
        yield restaurantsController_1.default.getSingleRestaurant(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            restaurant,
            reviewMin: null,
            reviewMax: null,
        });
    }));
});
