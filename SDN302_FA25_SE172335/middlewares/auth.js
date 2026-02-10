const jwt = require("jsonwebtoken");
//1.
// const Account = require("../models/member.js");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    //1.
    // const account = await Account.findById(decoded.memberId);
    const account = await User.findById(decoded.memberId);
    if (!account) return res.status(401).json({ message: "Account not found" });

    req.user = account;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
