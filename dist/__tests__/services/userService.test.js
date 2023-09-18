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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../models/user"));
const userService_1 = __importDefault(require("../../services/userService"));
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../models/user");
describe("user services", () => {
    test("REGISTER ERROR: it should throw error on registration", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            firstname: "test",
            lastname: "test",
            email: "email@gmail.com",
            password: "12345678",
        };
        bcrypt_1.default.genSalt.mockResolvedValue(12);
        bcrypt_1.default.hash.mockResolvedValue("hashedPassword");
        user_1.default.create.mockImplementationOnce(() => Promise.reject({ code: 11000 }));
        try {
            yield userService_1.default.registerUser(userData);
        }
        catch (error) {
            expect(error.message).toEqual("User already exists");
        }
    }));
    test("LOGIN SUCCESS: it should login user and return token", () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.default.findOne.mockResolvedValue({
            firstname: "test",
            lastname: "test",
            email: "email@gmail.com",
            password: "12345678",
            _id: "id",
        });
        bcrypt_1.default.compare.mockResolvedValue(true);
        jsonwebtoken_1.default.sign.mockReturnValue("token");
        const result = yield userService_1.default.loginUser("email", "password");
        expect(result).toEqual({
            firstname: "test",
            lastname: "test",
            email: "email@gmail.com",
            token: "token",
            _id: "id",
        });
    }));
    test("LOGIN ERROR: it should throw error", () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.default.findOne.mockResolvedValue({
            firstname: "test",
            lastname: "test",
            email: "email@gmail.com",
            password: "12345678",
            _id: "id",
        });
        bcrypt_1.default.compare.mockResolvedValue(false);
        jsonwebtoken_1.default.sign.mockReturnValue("token");
        try {
            yield userService_1.default.loginUser("email", "password");
        }
        catch (error) {
            expect(error.message).toEqual("Invalid email or password");
        }
    }));
});
