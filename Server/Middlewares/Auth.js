import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: `Unauthorized! Token Not Found`, success: false });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decodedToken;

    if (!id)
      return res.status(403).json({
        message: `Unauthorized! Bad Token.Login Again`,
        success: false,
      });

    req.body.userID = id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:`Internal Server Error`,success:false})
  }
};

export default auth;
