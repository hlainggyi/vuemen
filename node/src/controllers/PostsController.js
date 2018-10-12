const Post = require('../models/Post')

module.exports = {
  async index (req, res) {
    try {
      const posts = await Post.find().sort({"date": -1})
      res.send({
        headers: req.headers,
        posts: posts
      })
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the posts'
      })
    }
  },
  async show (req, res) {
    try {
      const post = await Post.findById({ _id: req.params.postId })
      res.send(post)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the posts'
      })
    }
  },
  async post (req, res) {
    try {
      const post = await Post.create(req.body)
      res.send(post)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the post'
      })
    }
  },
  async put (req, res) {
    try {
      await Post.update({ _id: req.params.postId }, req.body)
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the post'
      })
    }
  },
  async remove (req, res) {
    try {
      await Post.remove({ _id: req.params.postId })
      res.send("success deleted")
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the post'
      })
    }
  }
}
