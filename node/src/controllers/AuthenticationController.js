const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/settings.conf')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      res.send({
        user: user,
        token: jwtSignUser(user.toJSON())
      })
    } catch (err) {
      res.status(400).send({
        success: false,
        msg: 'This email account is already in use.'
      })
    }
  },
  async login(req, res) {
    try {
      const {
        email,
        password
      } = req.body
      const user = await User.findOne({
        email: email
      }, function(err, user) {
        if (err) throw err

        if (!user) {
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. User not found.'
          })
        } else {
          // check if password matches
          user.comparePassword(password, function(err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              // return the information including token as JSON
              res.send({
                user: user,
                token: jwtSignUser(user.toJSON())
              })
            } else {
              res.status(401).send({
                success: false,
                msg: 'Authentication failed. Wrong password.'
              })
            }
          })
        }
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}
