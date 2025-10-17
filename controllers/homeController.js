const Recipe = require('../models/recipeSchema');

module.exports.getHome = async (req, res) => {
  try {
    // ✅ Ye middleware ke baad chalega, to req.user hamesha available hoga
    const recipes = await Recipe.find({}).populate('author', 'username').exec();
    res.render('index', { 
      title: "Dashboard", 
      page: "dashboard", 
      recipes, 
      user: req.user 
    });
  } catch (err) {
    console.error("Dashboard load error:", err.message);
    res.redirect('/auth/login');
  }
};
