"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const restaurantSchema = new mongoose_1.default.Schema({
    address: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    imageUrl: String,
    averageRating: Number,
    reviews: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "Review",
        default: [],
    },
});
const Restaurant = mongoose_1.default.model("Restaurant", restaurantSchema);
exports.default = Restaurant;
