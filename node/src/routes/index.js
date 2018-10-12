
const AuthenticationController = require('../controllers/AuthenticationController')
const PostsController = require('../controllers/PostsController')
const AuthenticationPolicy = require('../policies/AuthenticationPolicy')

const isRole = require('../policies/isRole') // middleware for checking if user's role is permitted to make request

// // isAuthenticated
// const isAuthenticated = require('../policies/isAuthenticated')


module.exports = (app) => {
  app.post('/register', AuthenticationPolicy.register, AuthenticationController.register),
  app.post('/login', AuthenticationController.login)
  app.get('/posts', PostsController.index)
  app.get('/posts/:postId', PostsController.show)
  app.put('/posts/:postId', isRole('admin', 'manager', 'editer'), PostsController.put)
  app.delete('/posts/:postId', isRole('admin', 'manager', 'editer'), PostsController.remove)
  app.post('/posts', PostsController.post)
}
