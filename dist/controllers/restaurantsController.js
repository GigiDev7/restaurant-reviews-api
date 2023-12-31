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
const restaurantServices_1 = __importDefault(require("../services/restaurantServices"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = 1;
        if (req.query.page) {
            page = +req.query.page;
        }
        const { results: restaurants, totalCount } = yield restaurantServices_1.default.getRestaurants(page, req.query.minRating, req.query.maxRating);
        res.status(200).json({ totalCount, restaurants });
    }
    catch (error) {
        next(error);
    }
});
const getSingleRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurantId = new mongoose_1.default.Types.ObjectId(req.params.restaurantId);
        const result = yield restaurantServices_1.default.getSingleRestaurant(restaurantId);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    getAllRestaurants,
    getSingleRestaurant,
};
