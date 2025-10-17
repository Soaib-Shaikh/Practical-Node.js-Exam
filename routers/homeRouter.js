const express = require("express");
const homeRouter = express.Router();
const homeCtrl = require('../controllers/homeController');
const auth = require('../middlewares/auth');

homeRouter.get('/', homeCtrl.getHome);

module.exports = homeRouter;
