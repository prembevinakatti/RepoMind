const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existngUser = await authModel.findOne({ email });
    if (existngUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const newUser = await authModel.create({
      username,
      email,
      password,
    });

    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user." });
    }

    const token = await jwt.sign(
      { userId: newUser._id },
      process.env.JWT_TOKEN,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Only over HTTPS
      sameSite: "None", // Required for cross-site requests (e.g., frontend on different domain)
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });

    return res.status(201).json({
      message: "User registered successfully.",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log("Error in user registration:", error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Only over HTTPS
      sameSite: "None", // Required for cross-site requests (e.g., frontend on different domain)
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });

    return res.status(201).json({
      message: "User registered successfully.",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log("Error in user login:", error);
  }
};

