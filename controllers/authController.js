const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.getLogin = (req, res) => {
  return res.render("./pages/auth/login");
};

module.exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {

      let isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        const payload = {
          id: user.id,
          role: user.role,
          name: user.username
        };
        const jwtSecret = process.env.SECRET_KEY || process.env.SESSION_SECRET || process.env.PRIVATE_KEY;
        const token = jwt.sign(payload, jwtSecret);
        res.cookie('token', token);

        // ✅ Redirect to home/dashboard
        return res.redirect('/');
      
    } else {
      return res.status(401).redirect('/auth/login?error=' + encodeURIComponent('Invalid Password'));
    }

  }else {
    return res.status(401).redirect('/auth/login?error=' + encodeURIComponent('No user found'));
  }
} catch (error) {
  return res.status(500).json({ message: error.message });
}
};

module.exports.getSignup = (req, res) => {
  return res.render("./pages/auth/signup");
};

module.exports.postSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // check if user exists
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.redirect("/auth/signup?error=User already exists");
    }

    const created = await User.create({
      username,
      email,
      password,
    });


    return res.redirect("/auth/login?success=" + encodeURIComponent("Signup successful! Please log in."));
  } catch (error) {
    console.error(error.message);
    return res.redirect("/auth/signup?error=Something went wrong");
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.redirect('/auth/login');
};
