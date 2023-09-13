"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurantsController_1 = __importDefault(require("../controllers/restaurantsController"));
const protectAuth_1 = __importDefault(require("../middlewares/protectAuth"));
const router = express_1.default.Router();
router.use(protectAuth_1.default);
router.get("/", restaurantsController_1.default.getAllRestaurants);
router.get("/:restaurantId", restaurantsController_1.default.getSingleRestaurant);
exports.default = router;
