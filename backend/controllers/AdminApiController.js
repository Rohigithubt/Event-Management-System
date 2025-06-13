const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const global = require('../helper/GlobalHelper');

module.exports ={
    // index,
    // login,
    register,
    
};

async function register(req, res) {
  const { name, email, password } = req.body;
  console.log(req.body);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  try {
    const user = await Admin.findOne({ email });
    if (user) {
      return res.status(401).json({ status: false, message: "Email is already in use" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    await Admin.create(req.body);

    res.status(200).json({ status: true, message: "User created successfully!" });
  } catch (error) {
    console.log("Registration failed:", error);
    res.status(500).send("Internal server error");
  }
}
