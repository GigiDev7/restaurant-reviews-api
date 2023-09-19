"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const restaurantRoutes_1 = __importDefault(require("./routes/restaurantRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//Global middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Route middlewares
app.use("/api/user", userRoutes_1.default);
app.use("/api/restaurant", restaurantRoutes_1.default);
app.use("/api/review", reviewRoutes_1.default);
//Error handler middleware
app.use(errorHandler_1.default);
exports.default = app;
