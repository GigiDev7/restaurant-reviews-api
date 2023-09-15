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
const user_1 = __importDefault(require("../../models/user"));
const userService_1 = __importDefault(require("../../services/userService"));
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../models/user");
jest.mock("../../services/userService");
describe("user services", () => {
    it("should register user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            firstname: "test",
            lastname: "test",
            email: "t@gmail.com",
            password: "12345678",
        };
        bcrypt_1.default.genSalt.mockResolvedValue(12);
        bcrypt_1.default.hash.mockResolvedValue("hashedPassword");
        user_1.default.create.mockResolvedValue({});
        const result = yield userService_1.default.registerUser(userData);
        expect(result).toEqual("User created!");
    }));
});
