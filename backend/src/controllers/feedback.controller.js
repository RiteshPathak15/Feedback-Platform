import { User } from "../models/user.models.js";
import { Feedback } from "../models/Feedback.models.js"; // Import the Feedback model

const addFeedback = async (req, res) => {
  // Validate feedback
  // Assign reward points based on feedback length
  // Create a new feedback document
  // Save in database
  // Update the user's reward points

  try {
    const userId = req.user._id;
    const { feedbackText } = req.body;

    if (!feedbackText) {
      return res.status(400).json({ message: "Feedback text is required" });
    }

    const points = feedbackText.length > 50 ? 10 : 5;

    const feedback = new Feedback({
      user: userId,
      feedbackText,
      pointsEarned: points,
    });

    await feedback.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { rewardPoints: points } },
      { new: true }
    );

    return res.status(201).json({
      message: "Feedback added successfully",
      feedback,
      totalRewardPoints: user.rewardpoints,
    });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export { addFeedback };
