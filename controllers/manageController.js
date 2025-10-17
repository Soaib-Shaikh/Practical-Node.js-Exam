const User = require('../models/userSchema');
const Recipe = require('../models/recipeSchema');

module.exports.getManageUsers = async (req, res) => {
  try {
    const users = await User.find({}).lean();
    const counts = await Recipe.aggregate([
      { $group: { _id: '$author', count: { $sum: 1 } } }
    ]);
    const countMap = {};
    // Skip entries with null/undefined _id (recipes without author)
    counts.forEach(cur => {
      if (cur._id) countMap[cur._id.toString()] = cur.count;
    });
    const usersWithCounts = users.map(u => ({ ...u, recipeCount: countMap[u._id.toString()] || 0 }));
    res.render('./pages/manage/manageUser', { users: usersWithCounts });
  }
    catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports.getManageRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).populate('author', 'username');
    res.render('./pages/manage/manageRecipe', { recipes });
    } catch (err) {
    res.status(500).send('Server Error');
    }
};

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await Recipe.deleteMany({ author: userId });
    await User.deleteOne({ _id: userId });
    res.redirect('/manage/users');
  } catch (err) {
    res.status(500).send('Error deleting user');
  }
};