import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to db
(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected to DB");
})();
