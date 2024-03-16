

exports.login = async (req, res) => {
    res.redirect('/catalog');
};

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
};
