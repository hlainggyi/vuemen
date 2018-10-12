<template>
  <div>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap v-for="post in posts" :key="post._id">
          <v-flex xs12>
            <v-card>
              <v-layout>
                <v-flex xs12>
                  <v-card-title primary-title>
                      <span class="headline mb-0 grey--text">{{ post.title }} </span>
                    <v-spacer></v-spacer>
                      <span class="grey--text">
                        <v-icon class="icon-font">mdi-account</v-icon>
                        {{ post.author.name }}
                      </span>
                      <span class="grey--text">
                        <v-icon class="icon-font">mdi-clock</v-icon>
                        {{ post.date | formatDate }}
                      </span>
                  </v-card-title>
                  <v-card-text>
                    <span>{{ post.body | trimLength }}</span>
                    <a @click="$router.push({
                      name: 'show-posts',
                      params: { postId: post._id }
                    })">read more</a>
                  </v-card-text>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                  <v-btn flat color="orange">Share</v-btn>
                  <v-btn flat color="orange">Explore</v-btn>
                <v-spacer></v-spacer>
                <span v-if="isUserLoggedIn">
                  <v-btn flat color="orange" v-if="isAuthenticated || $store.state.user._id == post.author._id" @click="edit(post)">Edit</v-btn>
                  <v-btn flat color="error"  v-if="isAuthenticated || $store.state.user._id == post.author._id" @click="delPost(post)">Delete</v-btn>
                </span>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

    <v-btn
      fab
      bottom
      right
      color="light-blue darken-1"
      dark
      fixed
      @click="newPost"
      v-if="isUserLoggedIn"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create post
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-text-field
                  placeholder="Title"
                  v-model="post.title"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                name="input-7-1"
                label="Body"
                v-model="post.body"
                hint="Hint text"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat class="light-blue darken-1 white--text" @click="cancel">Cancel</v-btn>
          <v-btn flat class="light-blue darken-1 white--text" @click="create" v-if="createPost">Create Save</v-btn>
          <v-btn flat class="light-blue darken-1 white--text" @click="save" v-if="editPost">Edit Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogDel"
      max-width="250"
    >
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>

        <v-card-text>
          You can't revert your action
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="cancel"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="removePost"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
import SamplePostService from '@/api/SamplePostService'
export default {
  data () {
    return {
      dialog: false,
      dialogDel: false,
      createPost: false,
      editPost: false,
      posts: '',
      post: {
        title: '',
        body: '',
        author: {
          _id: '',
          name: ''
        }
      },
      error: ''
    }
  },
  created () {
    this.getPost ()
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ]),
    isAuthenticated () {
      if (this.isUserLoggedIn) {
        if (this.$store.state.user.role === "admin") {
          return true;
        } else if (this.$store.state.user.role === "manager") {
          return true;
        } else if (this.$store.state.user.role === "editer") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  methods: {
    async getPost () {
      this.posts = (await SamplePostService.index()).data.posts
    },
    cancel () {
      this.getPost (),
      this.dialog = false,
      this.dialogDel = false,
      this.createPost = false,
      this.editPost = false,
      this.post.title = ''
      this.post.body = ''
    },
    newPost () {
      this.dialog = true,
      this.createPost = true
    },
    async create () {
      this.error = null
      this.post.author._id = this.$store.state.user._id
      this.post.author.name = this.$store.state.user.name

      try {
        await SamplePostService.post(this.post)
        this.getPost ()
        this.post.title = ''
        this.post.body = ''
        this.dialog = false
        this.createPost = false
      } catch (err) {
        console.log(err)
      }
    },
    edit (post) {
      this.post = post
      this.dialog = true
      this.editPost = true
    },
    async save () {
      this.error = null
      this.post.author._id = this.$store.state.user._id
      this.post.author.name = this.$store.state.user.name
      const postId = this.post._id
      try {
        await SamplePostService.put(this.post)
        this.getPost ()
        this.post.title = ''
        this.post.body = ''
        this.dialog = false
        this.editPost = false
      } catch (err) {
        console.log(err)
      }
    },
    delPost(post) {
      this.post = post,
      this.dialogDel = true
    },
    async removePost () {
      this.error = null
      this.post.author._id = this.$store.state.user._id
      const postId = this.post._id
      try {
        await SamplePostService.remove (this.post)
        this.getPost ()
        this.post.title = ''
        this.post.body = ''
        this.dialogDel = false
      } catch (err) {
        console.log(err)
      }
    }
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return '-'
      }
      let date = val
      return moment(date).fromNow()
    },
    trimLength(val) {
      if (val.length < 200) {
        return val
      }
      return `${val.substring(0, 350)}  ...`
    }
  }
}
</script>

<style scoped>
  .icon-font {
    font-size: 1em;
    padding-left: 10px;
  }
</style>
