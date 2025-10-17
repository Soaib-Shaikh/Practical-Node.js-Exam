const express = require("express");
const homeRouter = express.Router();
const homeCtrl = require('../controllers/homeController');
const auth = require('../middlewares/auth');

// ✅ Root route protected by auth
homeRouter.get('/', auth.isAuth, homeCtrl.getHome);

module.exports = homeRouter;
