import express from "express";
import reviewController from "../controllers/reviewController";
import protectAuth from "../middlewares/protectAuth";
import { reviewValidator } from "../middlewares/validators/reviewValidators";
import validationHandler from "../middlewares/validationHandler";

const router = express.Router();

router.use(protectAuth);

router
  .route("/")
  .post(reviewValidator, validationHandler, reviewController.addReview);

router.route("/:reviewId").delete(reviewController.deleteReview);

export default router;
