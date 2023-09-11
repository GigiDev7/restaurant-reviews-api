"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = __importDefault(require("../controllers/reviewController"));
const protectAuth_1 = __importDefault(require("../middlewares/protectAuth"));
const reviewValidators_1 = require("../middlewares/validators/reviewValidators");
const validationHandler_1 = __importDefault(require("../middlewares/validationHandler"));
const router = express_1.default.Router();
router.use(protectAuth_1.default);
router
    .route("/")
    .post(reviewValidators_1.reviewValidator, validationHandler_1.default, reviewController_1.default.addReview);
router.route("/:reviewId").delete(reviewController_1.default.deleteReview);
exports.default = router;
