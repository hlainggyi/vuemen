<template>
  <div>
    <!-- <v-card> -->
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout>
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
                    <span>{{ post.body }}</span>
                  </v-card-text>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                <v-btn flat class="light-blue darken-1 white--text" @click="$router.push({name: 'home'})">Back</v-btn>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
                <v-spacer></v-spacer>
                  <!-- <v-btn flat color="orange" v-if="isUserLoggedIn" @click="edit(post)">Edit</v-btn>
                  <v-btn flat color="error" v-if="isUserLoggedIn">Delete</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
      createPost: false,
      editPost: false,
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
  async created () {
    this.getPost ()
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    async getPost () {
      this.post = (await SamplePostService.show(this.$route.params.postId)).data
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
