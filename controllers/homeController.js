const User = require('../models/userSchema');
const Recipe = require('../models/recipeSchema');

module.exports.getHome = async (req, res) => {
  const recipes = await Recipe.find({}).populate('author', 'username').exec();
  res.render('index', { title: "Dashboard", page: "dashboard", recipes });
};

