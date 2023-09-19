import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import userRouter from "./routes/userRoutes";
import restaurantRouter from "./routes/restaurantRoutes";
import reviewRouter from "./routes/reviewRoutes";

dotenv.config();

const app = express();

//Global middlewares
app.use(express.json());
app.use(cors());

//Route middlewares
app.use("/api/user", userRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/review", reviewRouter);

//Error handler middleware
app.use(errorHandler);

export default app;
