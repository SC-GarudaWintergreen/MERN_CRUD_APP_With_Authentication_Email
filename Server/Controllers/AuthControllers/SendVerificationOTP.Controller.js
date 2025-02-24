import User from "../../Models/User.Model.js";

const sendVerificationOTP = async (req, res) => {
  const { userID } = req.body;
//   console.log(userID);

  try {
    const user = await User.findById(userID);

    // console.log(user);

    if (user.isAccountVerified)
      return res
        .status(200)
        .json({ message: `User Account Is Already Verified`, success: true });

    const otp = String(
      Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000)
    );

    console.log(otp);

    user.accountVerificationOTP = otp;
    user.accountVerificationOTPExpireAt = Date.now() + 15 * 60 * 1000;
    user.accountUpdatedAt = Date.now();

    await user.save();

    return res
      .status(200)
      .json({ message: `OTP Generated And Sent To Email`, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: false });
  }
};
export default sendVerificationOTP;