const express = require("express");
const authRouter = express.Router();
const authCtrl = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

authRouter.get('/login', authCtrl.getLogin);
authRouter.post('/login', authCtrl.postLogin);

authRouter.get('/signup',authCtrl.getSignup);
authRouter.post('/signup',authCtrl.postSignup);

authRouter.get('/logout', auth.isAuth, authCtrl.logout);

authRouter.get('/profile', auth.isAuth, profileController.getProfile);
authRouter.post('/profile', auth.isAuth, upload.single('image'), profileController.postProfile);
authRouter.post('/profile/delete', auth.isAuth, profileController.deleteAccount);


module.exports = authRouter;
