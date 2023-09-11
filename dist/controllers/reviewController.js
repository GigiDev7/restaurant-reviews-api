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
const reviewsService_1 = __importDefault(require("../services/reviewsService"));
const mongoose_1 = __importDefault(require("mongoose"));
const addReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield reviewsService_1.default.addReview({
            comment: req.body.comment,
            date: req.body.date,
            rating: req.body.rating,
            restaurantId: new mongoose_1.default.Types.ObjectId(req.body.restaurantId),
            userId: new mongoose_1.default.Types.ObjectId(req.user.id),
        });
        res.status(201).json(review);
    }
    catch (error) {
        next(error);
    }
});
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongoose_1.default.Types.ObjectId(req.user.id);
        const reviewId = new mongoose_1.default.Types.ObjectId(req.params.reviewId);
        yield reviewsService_1.default.deleteReview(userId, reviewId);
        res.status(204).json();
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    addReview,
    deleteReview,
};
