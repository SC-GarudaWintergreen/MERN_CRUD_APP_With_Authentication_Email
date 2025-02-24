import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAccountVerified: { type: Boolean, default: false },
  accountVerificationOTP: { type: String, default: `` },
  accountVerificationOTPExpireAt: { type: Number, default: 0 },
  passwordResetOTP: { type: String, default: `` },
  passwordResetOTPExpireAt: { type: Number, default: 0 },
  accountCreated: { type: Number, default: Date.now() },
  accountLastUpdated: { type: Number, default: 0 },
  accountLastLogin: { type: Number, default: 0 },
});

const User = new mongoose.model("User", userSchema);

export default User;
