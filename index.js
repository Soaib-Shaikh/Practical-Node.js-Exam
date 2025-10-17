const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { db } = require('./configs/db');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000;



app.set('view engine', 'ejs');

app.use((req, res, next) => {
  (async () => {
    const token = req.cookies.token;
    if (!token) {
      res.locals.user = null;
      return next();
    }
    try {
      // Prefer SECRET_KEY, fall back to SESSION_SECRET or PRIVATE_KEY for compatibility
      const jwtSecret = process.env.SECRET_KEY || process.env.SESSION_SECRET || process.env.PRIVATE_KEY;
      const decoded = jwt.verify(token, jwtSecret);
      // lazy-load user to get role and latest data
      const User = require('./models/userSchema');
      const userRecord = await User.findById(decoded.id).lean();
      res.locals.user = userRecord || decoded;
    } catch (err) {
      res.locals.user = null;
    }
    return next();
  })();
});
app.use('/',require('./routers'));


app.listen(port,()=>{
    db;
    console.log(`Server is running on port -> http://localhost:${port}`);
})