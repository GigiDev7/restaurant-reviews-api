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
const reviewController_1 = __importDefault(require("../../../controllers/reviewController"));
const errorHandler_1 = __importDefault(require("../../../middlewares/errorHandler"));
const reviewsService_1 = __importDefault(require("../../../services/reviewsService"));
const customError_1 = __importDefault(require("../../../utils/customError"));
const errorTypes_1 = __importDefault(require("../../../utils/errorTypes"));
jest.mock("../../../services/reviewsService");
jest.mock("mongoose");
const req = {
    body: {
        comment: "comment",
        date: new Date(),
        rating: 5,
        restaurantId: "restaurantId",
    },
    user: {
        id: "userId",
    },
    params: {
        reviewId: "reviewId",
    },
};
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((json) => json),
};
const next = jest.fn((err) => (0, errorHandler_1.default)(err, req, res, next));
describe("review controller", () => {
    test("ADD REVIEW SUCESS: it should return 201 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        reviewsService_1.default.addReview.mockResolvedValue({});
        yield reviewController_1.default.addReview(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({});
    }));
    test("ADD REVIEW ERROR: it should go to error handling middleware", () => __awaiter(void 0, void 0, void 0, function* () {
        reviewsService_1.default.addReview.mockRejectedValue(new customError_1.default(errorTypes_1.default.NotFoundError, "Not found"));
        yield reviewController_1.default.addReview(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Not found" });
    }));
    test("DELETE REVIEW SUCCESS: it should return 204 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        reviewsService_1.default.deleteReview.mockResolvedValue({});
        yield reviewController_1.default.deleteReview(req, res, next);
        expect(res.status).toHaveBeenCalledWith(204);
    }));
    test("DELETE REVIEW ERROR: it should go to error handling middleware", () => __awaiter(void 0, void 0, void 0, function* () {
        reviewsService_1.default.addReview.mockRejectedValue(new customError_1.default(errorTypes_1.default.NotFoundError, "Not found"));
        yield reviewController_1.default.deleteReview(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Not found" });
    }));
});
