import Cricketer from "../../Models/Cricketer.Model.js";

const updateCricketerByID = async (req, res) => {
  const {
    name,
    nationality,
    jerseyNumber,
    teamRole,
    DOB,
    battingStyle,
    bowlingStyle,
  } = req.body;
  const { id } = req.params;

  try {
    const updatedData = {
      ...(name && { name }),
      ...(nationality && { nationality }),
      ...(jerseyNumber && { jerseyNumber }),
      ...(teamRole && { teamRole }),
      ...(DOB && { DOB }),
      ...(battingStyle && { battingStyle }),
      ...(bowlingStyle && { bowlingStyle }),
    };
    const cricketerExists = await Cricketer.findByIdAndUpdate(id, {
      new: true,
    });

    if (!cricketerExists)
      return res
        .status(400)
        .json({ message: `Could Not Update Cricketer`, success: false });

    return res
      .status(200)
      .json({ message: `Cricketer Updated Sucessfully`, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: true });
  }
};

export default updateCricketerByID;
