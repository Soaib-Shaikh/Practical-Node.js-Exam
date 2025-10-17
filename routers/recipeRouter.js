const express = require("express");
const recipeRouter = express.Router();
const recipeCtrl = require('../controllers/recipeController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

recipeRouter.get('/add', auth.isAuth, recipeCtrl.getAddRecipe);
recipeRouter.post('/add', auth.isAuth, upload.single('image'), recipeCtrl.postAddRecipe);

recipeRouter.get('/user', auth.isAuth, recipeCtrl.getUserRecipes);

recipeRouter.get('/delete/:id', auth.isAuth, recipeCtrl.deleteRecipe);

recipeRouter.get('/:id', auth.isAuth, recipeCtrl.getRecipeById);

module.exports = recipeRouter;