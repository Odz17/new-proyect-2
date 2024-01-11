module.exports = (req, res, next) => {
    if ( req.session.currentUser ) {
        res.locals.isLoggedIn = true;
    } else {
        res.locals.isLoggedIn = false;
    }
    next();
};