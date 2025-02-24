import User from "../../Models/User.Model.js";

const getUserData = async (req, res) => {
  const { userID } = req.body;

  try {
    const userData = await User.findById(userID).select(
      "-password,-accountVerificationOTP -accountVerificationOTPExpireAt -passwordResetOTP -passpasswordResetOTPExpireAt"
    );

    return res
      .status(200)
      .json({ message: `Data Fetched Successfully`, success: true, userData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: false });
  }
};

export default getUserData;
