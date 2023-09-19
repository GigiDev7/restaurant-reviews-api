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
const restaurant_1 = __importDefault(require("../../../models/restaurant"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../../models/user"));
let token;
const restaurants = [{ name: "name", address: "address", imageUrl: "url" }];
describe("restaurant controller", () => {
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
    test("GET ALL RESTAURANTS SUCCESS: it should return array of restaurants", () => __awaiter(void 0, void 0, void 0, function* () {
        yield restaurant_1.default.create(restaurants);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/api/restaurant")
            .set("authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.totalCount).toEqual(1);
        expect(response.body.restaurants).toHaveLength(1);
    }));
    test("GET ALL RESTAURANTS ERROR: it should return auth error if there is not bearer token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield restaurant_1.default.create(restaurants);
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/restaurant");
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual("Authentication Failed");
    }));
    test("GET SINGLE RESTAURANT SUCCESS: it should find restaurant in db and return it", () => __awaiter(void 0, void 0, void 0, function* () {
        const restaurant = yield restaurant_1.default.create(restaurants[0]);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/restaurant/${restaurant._id}`)
            .set("authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
