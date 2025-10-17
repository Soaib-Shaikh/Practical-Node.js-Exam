const express = require('express');
const manageRouter = express.Router();
const manageCtrl = require('../controllers/manageController');
const recipeCtrl = require('../controllers/recipeController');
const auth = require('../middlewares/auth');

// Protect manage routes: must be authenticated and admin
manageRouter.get('/users', auth.isAuth, auth.isAdmin, manageCtrl.getManageUsers);
manageRouter.get('/recipes', auth.isAuth, auth.isAdmin, manageCtrl.getManageRecipes);
manageRouter.get('/deleteUser/:id', auth.isAuth, auth.isAdmin, manageCtrl.deleteUser);
manageRouter.get('/deleteRecipe/:id', auth.isAuth, auth.isAdmin, recipeCtrl.deleteRecipe);

module.exports = manageRouter;