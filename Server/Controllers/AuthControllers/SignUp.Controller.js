import User from "../../Models/User.Model.js";
import validateEmail from "../../Validations/EmailValidator.js";
import validatePassword from "../../Validations/PasswordValidator.js";
import validateUsername from "../../Validations/UsernameValidator.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !password || !username)
    return res.status(400).json({
      message: `None of the required fields can be empty`,
      success: false,
    });

  //   Validations

  if (!validateEmail(email))
    return res.status(400).json({
      message: `Email Doesnt Satisfy Required Criteria`,
      success: false,
    });

  if (!validateUsername(username))
    return res.status(400).json({
      message: `Username Doesnt Satisfy Required Criteria`,
      success: false,
    });

  if (!validatePassword(password))
    return res.status(400).json({
      message: `Email Doesnt Satisfy Required Criteria`,
      success: false,
    });

  try {
    const isEmailExists = await User.findOne({ email });
    if (isEmailExists)
      return res.status(400).json({
        message: `Email ID Already Associated With Another Account`,
        success: false,
      });

    const isUsernameExists = await User.findOne({ username });

    if (isUsernameExists)
      return res.status(400).json({
        message: `Username Already Associated With Another Account`,
        success: false,
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: `New User Created Sucessfully`, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: false });
  }
};
export default signup;
