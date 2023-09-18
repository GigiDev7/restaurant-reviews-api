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
const userController_1 = __importDefault(require("../../controllers/userController"));
const userService_1 = __importDefault(require("../../services/userService"));
const customError_1 = __importDefault(require("../../utils/customError"));
const errorTypes_1 = __importDefault(require("../../utils/errorTypes"));
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
jest.mock("../../services/userService");
const req = {
    body: {
        email: "user@example.com",
        password: "password",
    },
};
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((json) => json),
};
const next = jest.fn((err) => (0, errorHandler_1.default)(err, req, res, next));
describe("user controller", () => {
    test("LOGIN SUCESS: it should return 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        userService_1.default.loginUser.mockResolvedValue({});
        yield userController_1.default.loginUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({});
    }));
    test("LOGIN ERROR: it should go to error middleware", () => __awaiter(void 0, void 0, void 0, function* () {
        userService_1.default.loginUser.mockRejectedValue(new customError_1.default(errorTypes_1.default.InvalidCredentialsError, "Invalid credentials"));
        yield userController_1.default.loginUser(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    }));
    test("REGISTER SUCCESS: it should return 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        userService_1.default.registerUser.mockResolvedValue({});
        yield userController_1.default.registerUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Successfully registered",
        });
    }));
    test("REGISTER ERROR: it should go to error handling middleware", () => __awaiter(void 0, void 0, void 0, function* () {
        userService_1.default.registerUser.mockRejectedValue(new customError_1.default(errorTypes_1.default.UserExistsError, "User already exists"));
        yield userController_1.default.registerUser(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: "User already exists",
        });
    }));
});
