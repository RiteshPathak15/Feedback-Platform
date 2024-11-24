import { User } from ".././models/user.models.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  /*
     validation
     is user present or not
     pass is hassed
    */

  try {
    const { fullname, username, email, password } = req.body;
    // validation for register (required field)
    if (!fullname || !username || !email || !password) {
      console.log("All field required for register");
      return res
        .status(201)
        .json({ message: "ALl fields required for registration" });
    }

    // User present or not
    const exisitingEmail = await User.findOne({ email });
    if (exisitingEmail) {
      console.log("User is already register");
      return res.status(400).json({ message: "User is already present" });
    }

    const hasedpassword = await bcrypt.hash(password, 10);

    const newUser = User({
      fullname,
      username,
      email,
      password: hasedpassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        rewardpoints: newUser.rewardpoints,
        isPremium: newUser.isPremium,
      },
    });
  } catch (error) {
    console.log("Error with registeration", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export { registerUser };
