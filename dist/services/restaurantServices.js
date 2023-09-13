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
const restaurant_1 = __importDefault(require("../models/restaurant"));
const customError_1 = __importDefault(require("../utils/customError"));
const errorTypes_1 = __importDefault(require("../utils/errorTypes"));
const reviews_1 = __importDefault(require("../models/reviews"));
const getRestaurants = (page, minRating, maxRating) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 6;
    const skip = (page - 1) * limit;
    let filters = {};
    if (minRating && maxRating) {
        filters.averageRating = { $gte: +minRating, $lte: +maxRating };
    }
    const totalCount = yield restaurant_1.default.countDocuments(filters);
    const results = yield restaurant_1.default.aggregate([
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
            $unset: ["__v"],
        },
        {
            $sort: { averageRating: -1 },
        },
    ]);
    return { results, totalCount };
});
const getSingleRestaurant = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurant_1.default.findById(restaurantId, "-__v").populate({
        path: "reviews",
        select: "-__v",
        options: { sort: { date: -1 } },
        populate: { path: "user", select: "-password -__v" },
    });
    if (!restaurant) {
        throw new customError_1.default(errorTypes_1.default.NotFoundError, "Restaurant not found");
    }
    let reviewMin = null;
    let reviewMax = null;
    if (restaurant.reviews.length > 1) {
        reviewMin = yield reviews_1.default.find({ restaurant: restaurantId }, "-__v")
            .sort({ rating: 1 })
            .limit(1)
            .populate("user", "-password -__v");
        reviewMax = yield reviews_1.default.find({ restaurant: restaurantId }, "-__v")
            .sort({ rating: -1 })
            .limit(1)
            .populate("user", "-password -__v");
    }
    return {
        restaurant,
        reviewMax: reviewMax ? reviewMax[0] : null,
        reviewMin: reviewMin ? reviewMin[0] : null,
    };
});
exports.default = {
    getRestaurants,
    getSingleRestaurant,
};
