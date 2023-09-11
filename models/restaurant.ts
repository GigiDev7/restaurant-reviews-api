import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: String,
  averageRating: Number,
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Review",
    default: [],
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
