import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import CustomError from "../utils/customError";
import Errors from "../utils/errorTypes";

const registerUser = async (userData: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  try {
    await User.create({
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      password: hashedPassword,
    });
  } catch (err: any) {
    if (err.code && err.code === 11000) {
      throw new CustomError(Errors.UserExistsError, "User already exists");
    }
    throw err;
  }
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError(
      Errors.InvalidCredentialsError,
      "Invalid email or password"
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new CustomError(
      Errors.InvalidCredentialsError,
      "Invalid email or password"
    );
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    token,
  };
};

export default {
  registerUser,
  loginUser,
};
