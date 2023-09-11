import express from "express";
import userController from "../controllers/userController";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/validators/userValidators";
import validationHandler from "../middlewares/validationHandler";

const router = express.Router();

router.post(
  "/signin",
  loginValidator,
  validationHandler,
  userController.loginUser
);
router.post(
  "/signup",
  registerValidator,
  validationHandler,
  userController.registerUser
);

export default router;
