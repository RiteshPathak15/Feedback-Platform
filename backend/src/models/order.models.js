import mongoose,{Schema} from "mongoose";
const feedbackSchema = new Schema(
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Assuming a rating scale of 1 to 5
      },
      comment: {
        type: String,
        trim: true,
      },
      rewardPoints: {
        type: Number,
        default: 0, // Points awarded for providing feedback
      },
    },
    {
      timestamps: true,
    }
  );
  
  export const Feedback = mongoose.model("Feedback", feedbackSchema);
  