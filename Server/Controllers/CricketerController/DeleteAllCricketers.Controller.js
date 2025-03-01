import Cricketer from "../../Models/Cricketer.Model.js";

const deleteAllCricketers = async (req, res) => {
  const { userID } = req.body;

  try {
    await Cricketer.deleteMany({ createdBy: userID });

    return res
      .status(200)
      .json({ message: `All Cricketers Are Successfully Deleted` });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: true });
  }
};

export default deleteAllCricketers;
