import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import showPost from '@/views/Post/Show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts/:postId',
      name: 'show-posts',
      component: showPost
    },
		{ path: '*', redirect: '/' }
  ]
})
