const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email(),
      role: Joi.string().required(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error, value} = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'You must provide a valid name error.'
          })
          break;
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address.'
          })
          break;
        case 'password':
          res.status(400).send({
            error: `This password provided failed to match the following rule.
              <br>
              1.It must contain ONLY the following balar balar balar ...
            `
          })
          break;
        case 'role':
          res.status(400).send({
            error: 'You must provide a valid role error.'
          })
          break;
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
