import express from "express";
import restaurantsController from "../controllers/restaurantsController";
import protectAuth from "../middlewares/protectAuth";

const router = express.Router();

router.use(protectAuth);

router.get("/", restaurantsController.getAllRestaurants);
router.get("/:restaurantId", restaurantsController.getSingleRestaurant);

export default router;
