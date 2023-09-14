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
const user_1 = __importDefault(require("../models/user"));
const customError_1 = __importDefault(require("../utils/customError"));
const errorTypes_1 = __importDefault(require("../utils/errorTypes"));
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(12);
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, salt);
    try {
        yield user_1.default.create({
            email: userData.email,
            firstname: userData.firstname,
            lastname: userData.lastname,
            password: hashedPassword,
        });
    }
    catch (err) {
        if (err.code && err.code === 11000) {
            throw new customError_1.default(errorTypes_1.default.UserExistsError, "User already exists");
        }
        throw err;
    }
});
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        throw new customError_1.default(errorTypes_1.default.InvalidCredentialsError, "Invalid email or password");
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new customError_1.default(errorTypes_1.default.InvalidCredentialsError, "Invalid email or password");
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
    return {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token,
    };
});
exports.default = {
    registerUser,
    loginUser,
};
