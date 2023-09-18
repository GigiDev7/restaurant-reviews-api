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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../models/user"));
const protectAuth_1 = __importDefault(require("../../middlewares/protectAuth"));
jest.mock("jsonwebtoken");
jest.mock("../../models/user");
const reqWithoutJWT = { headers: {} };
const reqWithJWT = { headers: { authorization: "Bearer token" } };
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((json) => json),
};
const next = jest.fn();
describe("protect auth middleware", () => {
    test("it should return 401 error if there is not jwt token in headers", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, protectAuth_1.default)(reqWithoutJWT, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Authentication Failed" });
    }));
    test("it should go to next middleware if there is valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        jsonwebtoken_1.default.verify.mockReturnValue({ id: "userId" });
        user_1.default.findById.mockResolvedValue({
            _id: "userId",
            email: "email",
            firstname: "firstName",
            lastname: "lastName",
        });
        yield (0, protectAuth_1.default)(reqWithJWT, res, next);
        expect(next).toHaveBeenCalled();
    }));
});
