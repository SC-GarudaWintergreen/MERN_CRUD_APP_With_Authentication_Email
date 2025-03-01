import transporter from "../../Config/Nodemailer.js";
import SendVerificationOTPTemplate from "../../Email/SendVerificationOTP.Template.js";
import epochToLocalTime from "../../Helpers/EpochToLocalTime.js";
import User from "../../Models/User.Model.js";

const sendVerificationOTP = async (req, res) => {
  const { userID } = req.body;
  let OTPExpire = 0;
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
    OTPExpire = Date.now() + 15 * 60 * 60 * 1000;
    user.accountVerificationOTPExpireAt = OTPExpire;
    user.accountUpdatedAt = Date.now();

    await user.save();

    const mailOptions = {
      from: {
        name: "MERN CRUD APP Team",
        address: process.env.SENDER_EMAIL,
      },
      to: user.email,
      subject: `Please Verify Your Account `,
      text: SendVerificationOTPTemplate.replace(
        `{{Username}}`,
        `${user.username}`
      )
        .replace(`{{Date-Time}}`, `${epochToLocalTime(OTPExpire)}.`)
        .replace(`{{OTP}}`, `${otp}`),
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      else console.log(`Mail Sent ${info}`);
    });

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
