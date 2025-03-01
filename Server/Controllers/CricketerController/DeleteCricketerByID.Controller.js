import Cricketer from "../../Models/Cricketer.Model.js";

const deleteCricketerByID = async (req, res) => {
  const { id } = req.params;

  try {
    const cricketerExist = await Cricketer.findOne(id);

    if (!cricketerExist)
      return res
        .status(400)
        .json({ message: `No Cricketer Found For Deletion`, success: false });

    await Cricketer.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: `Cricketer Deleted Successfully`, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: true });
  }
};

export default deleteCricketerByID;
