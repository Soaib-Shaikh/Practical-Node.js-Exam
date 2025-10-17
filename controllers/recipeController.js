const Recipe = require('../models/recipeSchema');

exports.getAddRecipe = (req, res) => {
    res.render('./pages/recipes/addRecipe');
};

exports.postAddRecipe = async (req, res) => {
    const { name, description, ingredients, time, instructions, cuisine, difficulty } = req.body || {};
    const ingredientList = ingredients ? ingredients.split(',') : [];
    const newRecipe = new Recipe({
        name,
        description,
        ingredients: ingredientList,
        time,
        instructions,
        cuisine,
        difficulty: difficulty || 'Easy',
        image: req.file ? req.file.path : null,
        author: (req.user && (req.user._id || req.user.id)) || null
    });
    try {
        await newRecipe.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error saving recipe');
    }
};

exports.getRecipeById = async (req, res) => {
    const recipeId = req.params.id;
    try {
        const recipe = await Recipe.findById(recipeId).populate('author', 'username').exec();
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.render('./pages/recipes/viewRecipe', { recipe });
    } catch (err) {
        res.status(500).send('Error retrieving recipe');
    }
};

exports.getUserRecipes = async (req, res) => {
    try {
    const authorId = (req.user && (req.user._id || req.user.id));
    const recipes = await Recipe.find({ author: authorId }).exec();
        res.render('./pages/recipes/myRecipes', { recipes });
    } catch (err) {
        res.status(500).send('Error retrieving user recipes');
    }
};

exports.deleteRecipe = async (req, res) => {
    const recipeId = req.params.id;
    try {
        const authorId = (req.user && (req.user._id || req.user.id));
        await Recipe.deleteOne({ _id: recipeId, author: authorId });
        res.redirect('/recipe/user');
    } catch (err) {
        res.status(500).send('Error deleting recipe');
    }
};