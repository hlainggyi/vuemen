<template>
  <div>
    <v-toolbar color="light-blue darken-1" dark app fixed>
      <v-toolbar-title style="width: 300px">
        <v-toolbar-side-icon @click.stop="$emit('navigater')">
          <v-icon v-show="mini">menu</v-icon>
          <v-icon v-show="!mini">more_vert</v-icon>
        </v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Home</span>
      </v-toolbar-title><v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-btn icon large v-if="$store.state.isUserLoggedIn" @click="logout">
        <v-avatar size="32px" tile>
          <img src="../../assets/default.png" :alt="$store.state.user.email">
        </v-avatar>
      </v-btn>

      <button @click.stop="login = !login" v-if="!$store.state.isUserLoggedIn">SING IN</button>
    </v-toolbar>

    <v-dialog v-model="login" width="400px">
      <login v-on:cancel="login = false"></login>
    </v-dialog>
  </div>

</template>
<script>
import Login from '../Auth/Login.vue'
export default {
  props: ['mini'],
  components: {
    Login
  },
  data () {
    return {
      login: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
