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
const restaurantServices_1 = __importDefault(require("../../../services/restaurantServices"));
const restaurant_1 = __importDefault(require("../../../models/restaurant"));
jest.mock("../../../models/restaurant");
jest.mock("../../../models/reviews");
const restaurantData = [
    { _id: "1", reviews: [], name: "rest 1" },
    { _id: "2", reviews: [], name: "rest 2" },
];
describe("restaurant services", () => {
    test("GET ALL RESTAURANTS SUCCESS: it should return array of restaurants", () => __awaiter(void 0, void 0, void 0, function* () {
        restaurant_1.default.aggregate.mockResolvedValue(restaurantData);
        restaurant_1.default.countDocuments.mockResolvedValue(2);
        const result = yield restaurantServices_1.default.getRestaurants(1);
        expect(result).toEqual({
            results: restaurantData,
            totalCount: 2,
        });
    }));
    test("GET SINGLE RESTAURANT SUCESS: it should return single restaurant data", () => __awaiter(void 0, void 0, void 0, function* () {
        restaurant_1.default.findById.mockReturnThis();
        restaurant_1.default.populate.mockResolvedValue(restaurantData[0]);
        const result = yield restaurantServices_1.default.getSingleRestaurant("_id");
        expect(result).toEqual({
            reviewMin: null,
            reviewMax: null,
            restaurant: restaurantData[0],
        });
    }));
});
