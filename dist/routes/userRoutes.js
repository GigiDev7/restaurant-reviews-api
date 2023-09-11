"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const userValidators_1 = require("../middlewares/validators/userValidators");
const validationHandler_1 = __importDefault(require("../middlewares/validationHandler"));
const router = express_1.default.Router();
router.post("/signin", userValidators_1.loginValidator, validationHandler_1.default, userController_1.default.loginUser);
router.post("/signup", userValidators_1.registerValidator, validationHandler_1.default, userController_1.default.registerUser);
exports.default = router;
