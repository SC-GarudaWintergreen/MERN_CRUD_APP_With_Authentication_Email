import mongoose from "mongoose";
import Cricketer from "../../Models/Cricketer.Model.js";

const addCricketer = async (req, res) => {
  try {
    const {
      name,
      nationality,
      jerseyNumber,
      teamRole,
      DOB,
      battingStyle,
      bowlingStyle,
      userID,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userID))
      return res.status(400).json({
        message: `Invalid User ID or Bad Token. Login Again`,
        success: false,
      });
    if (
      !name ||
      !nationality ||
      !jerseyNumber ||
      !teamRole ||
      !DOB ||
      !battingStyle ||
      !bowlingStyle
    )
      return res.status(400).json({
        message: `None of the required fields can be empty`,
        success: false,
      });

    const newCricketer = new Cricketer({
      name,
      nationality,
      jerseyNumber,
      teamRole,
      DOB,
      battingStyle,
      bowlingStyle,
      createdBy: userID,
    });

    await newCricketer.save();

    return res
      .status(201)
      .json({ message: `New Cricketer Has Been Created`, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: false });
  }
};

export default addCricketer;
