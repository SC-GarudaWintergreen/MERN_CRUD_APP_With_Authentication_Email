import Cricketer from "../../Models/Cricketer.Model.js";

const getAllCricketer = async (req, res) => {
  const { userID } = req.body;

  try {
    const allCricketers = await Cricketer.find({ createdBy: userID });

    return res.status(200).json({
      message: `Data Fetched Successfully`,
      success: true,
      cricketers: allCricketers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error`, success: false });
  }
};

export default getAllCricketer;
