const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../../../models/api/v1/Admin");

// Login Route
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ status: "fail", message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ status: "fail", message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ status: "success", message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ status: "fail", message: err.message });
  }
};

// Logout Route
const logout = (req, res) => {
    // Invalidate token on client-side by removing it
    return res.json({
      status: "success",
      message: "Logged out successfully. Please clear your token on the client side.",
    });
  };
  
  module.exports = { login, changePassword, logout };

// Change Password Route
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ status: "fail", message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ status: "fail", message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await Admin.updateOne({ _id: req.user.id }, { password: hashedPassword });

    const newToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({
      status: "success",
      message: "Password changed successfully",
      token: newToken,
    });
  } catch (err) {
    return res.status(500).json({ status: "fail", message: err.message });
  }
};

module.exports = { login, changePassword };