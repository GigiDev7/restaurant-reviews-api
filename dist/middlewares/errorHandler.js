"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorTypes_1 = __importDefault(require("../utils/errorTypes"));
function default_1(err, req, res, next) {
    if ((err === null || err === void 0 ? void 0 : err.name) === errorTypes_1.default.AuthenticationError ||
        (err === null || err === void 0 ? void 0 : err.name) === errorTypes_1.default.AuthorizationError) {
        return res.status(401).json({ message: err.message });
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === errorTypes_1.default.InvalidCredentialsError) {
        return res.status(401).json({ message: err.message });
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === errorTypes_1.default.NotFoundError) {
        return res.status(404).json({ message: err.message });
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === errorTypes_1.default.UserExistsError) {
        return res.status(409).json({ message: err.message });
    }
    else {
        return res
            .status(500)
            .json({ message: err.message || "Something went wrong" });
    }
}
exports.default = default_1;
