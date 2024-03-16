const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username)
    console.log(password)

    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/catalog');
    } else {
        res.redirect('/');
    }
};

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
};
