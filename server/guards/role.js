function roleGuard (roles = []) {
    return function (req, res, next) {
        if (!req.user) {
            return res.status(401).send();
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).send();
        }
        console.log('in roles', next)
        next();
    }
}

module.exports = roleGuard;