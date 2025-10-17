const User = require('../models/userSchema');
const upload = require('../middlewares/upload');

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user && (req.user._id || req.user.id);
        const user = await User.findById(userId).lean();
        if (!user) return res.status(404).send('User not found');
        res.render('./pages/auth/profile', { user });
    } catch (err) {
        res.status(500).send('Error loading profile');
    }
};

exports.postProfile = async (req, res) => {
    try {
        const userId = req.user && (req.user._id || req.user.id);
        const { username, email, password, age, mobilenumber, address, gender } = req.body;
        const update = { username, email, age, mobilenumber, address, gender };
        if (password) update.password = password;
        if (req.file && req.file.path) update.image = req.file.path;
        await User.findByIdAndUpdate(userId, update, { new: true });
        res.redirect('/auth/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating profile');
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user && (req.user._id || req.user.id);
        await User.findByIdAndDelete(userId);
        res.clearCookie('token');
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error deleting account');
    }
};
