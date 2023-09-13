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
const reviews_1 = __importDefault(require("../models/reviews"));
const restaurant_1 = __importDefault(require("../models/restaurant"));
const customError_1 = __importDefault(require("../utils/customError"));
const errorTypes_1 = __importDefault(require("../utils/errorTypes"));
const roundNumber_1 = require("../utils/roundNumber");
const addReview = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurant_1.default.findById(reviewData.restaurant);
    if (!restaurant) {
        throw new customError_1.default(errorTypes_1.default.NotFoundError, "Restaurant not found");
    }
    const review = yield reviews_1.default.create(reviewData);
    restaurant.reviews.push(review._id);
    //Update average rating
    if (!restaurant.averageRating) {
        restaurant.averageRating = reviewData.rating;
    }
    else {
        const sumRatings = restaurant.averageRating * (restaurant.reviews.length - 1);
        restaurant.averageRating = (0, roundNumber_1.roundNum)((sumRatings + reviewData.rating) / restaurant.reviews.length);
    }
    yield restaurant.save();
    return review;
});
const deleteReview = (userId, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield reviews_1.default.findById(reviewId);
    if (!review) {
        throw new customError_1.default(errorTypes_1.default.NotFoundError, "Review not found");
    }
    if (!review.user.equals(userId)) {
        throw new customError_1.default(errorTypes_1.default.AuthorizationError, "Authorization error");
    }
    const restaurant = yield restaurant_1.default.findById(review.restaurant);
    if (!restaurant) {
        throw new customError_1.default(errorTypes_1.default.NotFoundError, "Restaurant not found");
    }
    restaurant.reviews = restaurant.reviews.filter((rev) => !rev.equals(review._id));
    const sumRatings = restaurant.averageRating * (restaurant.reviews.length + 1);
    restaurant.averageRating = (0, roundNumber_1.roundNum)((sumRatings - review.rating) / restaurant.reviews.length);
    yield restaurant.save();
    yield review.deleteOne();
});
exports.default = {
    addReview,
    deleteReview,
};
