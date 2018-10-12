// isAuthenticated
const isAuthenticated = require('./isAuthenticated')

// middleware for doing role-based permissions
module.exports = function isRole(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;

  // return a middleware
  return (req, res, next) => {
    if (isAllowed(req.headers.role || isAuthenticated))
      next(); // role is allowed, so continue on the next middleware
    else {
      res.status(403).send({
        error: 'you do not have access permission to this resource'
      })
    }
  }
}
