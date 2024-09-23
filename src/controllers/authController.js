const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const welcomeEmail = require("../mail/AuthMail/Welcome.mail");
exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    user = new User({ name, email, phone, password });
    await user.save();
    if (user) {
      await welcomeEmail({ name: user.name, email: user.email });
    }
    return res.json({
      success: true,
      message: "Register Successfull",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password required",
      });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    const payload = { user: { id: user._id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      success: true,
      message: "Login Successfull",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        token,
        // Add any other user data you want to include
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
