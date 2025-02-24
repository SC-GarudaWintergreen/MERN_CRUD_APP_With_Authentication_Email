import User from "../../Models/User.Model.js";
import bcrypt from "bcryptjs";

const resetPassword = async (req, res) => {
  const { userID, OTP, password } = req.body;

  try {
    if (!OTP) {
      return res
        .status(400)
        .json({ message: `OTP Cannot Be Empty`, success: false });
    }

    const user = await User.findById(userID);

    if (
      OTP === user.passwordResetOTP &&
      Date.now() <= user.passwordResetOTPExpireAt
    ) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      user.passwordResetOTP = "";
      user.passwordResetOTPExpireAt = 0;
      user.accountLastUpdated = Date.now();

      await user.save();

      return res.status(200).json({
        message: `Password Reset Successfull`,
        success: true,
      });
    } else {
      return res
        .status(400)
        .json({ message: `Invalid Or Expired OTP`, success: false });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: false });
  }
};

export default resetPassword;
