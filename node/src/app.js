const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const config = require('./config/settings.conf')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'))
require('./routes')(app)
require('./config/passport.conf')
require('./config/mongoose.conf')

// restful api error handler
app.use(function(err, req, res, next) {
  console.log(err)
  if (req.app.get('env') !== 'development') {
    delete err.stack
  }
  res.status(err.statusCode || 500).json(err)
})
app.listen(process.env.PORT || config.port)
