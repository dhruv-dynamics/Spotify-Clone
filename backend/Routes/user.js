import { Router } from "express";
import User from "../Models/User.js";
import { generateToken } from "../helper/generateToken.js";
import jsonWeb from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Please provide username and password" });
    }

    let user = await User.findOne({ username });
    if (!user) {
      user = await User.findOne({ email: username });
    }

    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    const token = await generateToken(user._id);
    return res.json({ success: true, token, user, message: "Logged In Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, gender } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User with this username or email already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
      gender: gender || "Rather not say"
    });

    const token = await generateToken(user._id);
    return res.status(201).json({ success: true, message: "User Created Successfully", user, token });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, message: error.message || "Registration failed" });
  }
});

router.get("/me", async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const data = jsonWeb.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(data.id).select("-password");

    if (user) {
      return res.json({ user, success: true, message: "User Found" });
    } else {
      return res.status(404).json({ success: false, message: "User Not Found" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
});

export default router;