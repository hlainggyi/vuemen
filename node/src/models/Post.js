var mongoose = require('mongoose')
var Schema = mongoose.Schema

var postSchema = new Schema({
  title:  String,
  author: {
    _id: String,
    name: String,
  },
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
})

module.exports = mongoose.model('Post', postSchema)
