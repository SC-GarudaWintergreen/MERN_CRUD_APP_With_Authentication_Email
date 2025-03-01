import VerifyEmailTemplate from "../../Email/VerifyEmail.Template.js";
import User from "../../Models/User.Model.js";

const verifyEmail = async (req, res) => {
  const { userID, OTP } = req.body;

  try {
    if (!OTP) {
      return res
        .status(400)
        .json({ message: `OTP Cannot Be Empty`, success: false });
    }

    const user = await User.findById(userID);

    if (user.isAccountVerified)
      return res
        .status(200)
        .json({ message: `User Account Is Already Verified`, success: true });

    if (
      OTP === user.accountVerificationOTP &&
      Date.now() <= user.accountVerificationOTPExpireAt
    ) {
      user.isAccountVerified = true;
      user.accountVerificationOTP = "";
      user.accountVerificationOTPExpireAt = 0;
      user.accountLastUpdated = Date.now();

      await user.save();

      const mailOptions = {
        from: {
          name: "MERN CRUD APP Team",
          address: process.env.SENDER_EMAIL,
        },
        to: user.email,
        subject: `Account Verified Successfully`,
        text: VerifyEmailTemplate.replace(
          `{{Username}}`,
          `${user.username}`
        ).replace(`{{Date-Time}}`, `${epochToLocalTime(OTPExpire)}.`),
      };

      return res.status(200).json({
        message: `Account Has Been Verified Successfully`,
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
export default verifyEmail;
