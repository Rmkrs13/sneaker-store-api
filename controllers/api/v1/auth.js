const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../../../models/api/v1/Admin");

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ status: "fail", message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ status: "success", token });
    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message });
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const admin = await Admin.findById(req.user.id);
        if (!(await bcrypt.compare(oldPassword, admin.password))) {
            return res.status(400).json({ status: "fail", message: "Old password is incorrect" });
        }
        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();
        res.json({ status: "success", message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message });
    }
};

module.exports = { login, changePassword };