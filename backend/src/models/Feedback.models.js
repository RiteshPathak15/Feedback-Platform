import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  feedbackText: {
    type: String,
    required: true,
  },
  pointsEarned: {
    type: Number,
    default: 0,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export { Feedback };
