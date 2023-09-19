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
const user_1 = __importDefault(require("../../../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userData = {
    email: "test3@gmail.com",
    password: "12345678",
    firstname: "test",
    lastname: "test",
};
describe("user controller", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.connect();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.clearDatabase();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.closeDatabase();
    }));
    test("REGISTER USER SUCCESS: it should create new user in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/user/signup")
            .set("content-type", "application/json")
            .send(userData);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Successfully registered" });
    }));
    test("REGISTER USER ERROR: it should return error if user already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.create(userData);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/user/signup")
            .set("content-type", "application/json")
            .send(userData);
        expect(response.status).toBe(409);
        expect(response.body).toEqual({ message: "User already exists" });
    }));
    test("REGISTER USER ERROR: it should return error if there is invalid field", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/user/signup")
            .set("content-type", "application/json")
            .send(Object.assign(Object.assign({}, userData), { email: "email" }));
        expect(response.status).toBe(403);
        expect(response.body.errors).not.toHaveLength(0);
    }));
    test("LOGIN USER SUCCESS: it should find user in db and return it", () => __awaiter(void 0, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(12);
        const hashedPassword = yield bcrypt_1.default.hash(userData.password, salt);
        yield user_1.default.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/user/signin")
            .set("content-type", "application/json")
            .send({ email: "test3@gmail.com", password: "12345678" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({ email: "test3@gmail.com" }));
    }));
    test("LOGIN ERROR: it should return invalid credentials error if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/user/signin")
            .set("content-type", "application/json")
            .send({ email: "test3@gmail.com", password: "12345678" });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid email or password");
    }));
});
