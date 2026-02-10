const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// exports.getAllUser = async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (!users) {
//       return res
//         .status(404)
//         .json({ success: false, message: "no users found" });
//     }
//     return res.status(201).json({ success: true, data: users });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.signinUser = async (req, res) => {
  try {
    //1.
    // const { username, password } = req.body;
    const { name, key } = req.body;
    const jwtSecret = process.env.JWT_SECRET;
    //1.
    // const findAcc = await Members.findOne({ username });
    const findAcc = await User.findOne({ name });
    if (!findAcc) {
      return res.status(400).json("name not found!");
    }
    //1.
    // const isMatch = await bcrypt.compare(password, findAcc.password);
    const isMatch = await bcrypt.compare(key, findAcc.key);
    if (!isMatch) {
      return res.status(400).json({ messeage: "Invalid credentials" });
    }
    const accessToken = jwt.sign(
      {
        memberId: findAcc._id,
        //1.
        // username: findAcc.username,
        username: findAcc.name,
      },
      jwtSecret,
      { expiresIn: "1h" },
    );
    res.json({ success: true, accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.showLoginPage = async (req, res) => {
  try {
    res.render(
      "login",
      //1.thêm message và username để hiện thông báo lỗi
      {
        message: req.session.message,
        username: req.session.username,
      },
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  //1.
  // const { username, password } = req.body;
  const { name, key } = req.body;
  try {
    // const user = await Account.findOne({ username });
    const user = await User.findOne({ name });
    if (!user) {
      req.session.message = "Invalid username or password";
      // return res.redirect("/users/login");
      return res.redirect("/auth/login");
    }
    //1.
    // const match = await bcrypt.compare(password, user.password);
    const match = await bcrypt.compare(key, user.key);
    if (match) {
      //1.
      // req.session.username = username;
      req.session.username = name;
      req.session.message = null;
      // return res.redirect("/users/dashboard");
      return res.redirect("/page/foods");
    } else {
      req.session.message = "Invalid username or password";
      // return res.redirect("/users/login");
      return res.redirect("/auth/login");
    }
  } catch (error) {
    console.error("Login Error:", error);
    req.session.message = "An error occurred during login. Please try again.";
    // return res.redirect("users/login");
    return res.redirect("/auth/login");
  }
};
