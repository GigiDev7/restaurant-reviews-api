"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const db = __importStar(require("../../mockDB/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../../models/user"));
const restaurant_1 = __importDefault(require("../../../models/restaurant"));
const mongoose_1 = __importDefault(require("mongoose"));
let token;
const reviewData = {
    comment: "comment",
    date: "2023-09-09",
    rating: 5,
};
const restaurantData = { name: "name", address: "address", imageUrl: "url" };
describe("review controller", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.connect();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.create({
            email: "email",
            password: "password",
            firstname: "firstname",
            lastname: "lastname",
        });
        token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.clearDatabase();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.closeDatabase();
    }));
    test("ADD REVIEW SUCCESS: it should add new review to db and return 201 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const restaurant = yield restaurant_1.default.create(restaurantData);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/review")
            .set("content-type", "application/json")
            .set("authorization", `Bearer ${token}`)
            .send(Object.assign(Object.assign({}, reviewData), { restaurantId: restaurant._id }));
        expect(response.status).toBe(201);
    }));
    test("ADD REVIEW ERROR: return 404 error if there is no restaurant", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/review")
            .set("content-type", "application/json")
            .set("authorization", `Bearer ${token}`)
            .send(Object.assign(Object.assign({}, reviewData), { restaurantId: new mongoose_1.default.Types.ObjectId() }));
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Restaurant not found");
    }));
});
