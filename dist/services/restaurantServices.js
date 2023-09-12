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
});
exports.default = {
    getRestaurants,
};
