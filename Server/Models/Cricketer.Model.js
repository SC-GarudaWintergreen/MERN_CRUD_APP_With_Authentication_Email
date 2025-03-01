import mongoose from "mongoose";
import User from './User.Model.js'

const cricketerSchema = mongoose.Schema({
  name: { type: String, required: true },
  nationality: { type: String, required: true },
  jerseyNumber: { type: Number, required: true },
  teamRole: { type: String, required: true },
  DOB: { type: String, required: true },
  battingStyle: {
    type: String,
    required: true,
    enum: ["Right Hand Bat", "Left Hand Bat"],
  },
  bowlingStyle: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

const Cricketer = new mongoose.model("Cricketer", cricketerSchema);

export default Cricketer;
