<template>
  <div>
    <v-card v-if="register">
      <v-card-title class="grey lighten-4 py-4 title">
        Register
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>

          <v-flex xs11 offset-xs1>
              <v-text-field
                 prepend-inner-icon="person"
                 label="Name"
                 v-model="name"
                 required
               ></v-text-field>
               <v-flex xs12 sm12 d-flex>
                 <v-select
                   prepend-inner-icon="flag"
                   v-model="role"
                   :items="roles"
                   label="Role"
                 >
                 </v-select>
               </v-flex>
              <v-text-field
                 prepend-inner-icon="email"
                 label="E-mail"
                 v-model="email"
                 :rules="emailRules"
                 required
               ></v-text-field>
              <br>
              <v-text-field
                prepend-inner-icon="lock"
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <br>
              <div class="danger-alert" v-html="error" />
              <br>
              <v-btn
                dark
                class="green darken-2"
                @click="singup">
                Sing up
              </v-btn>
              <v-btn
                dark
                class="grey darken-2"
                @click.stop="$emit('cancel')">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <button @click="register = false"> <v-subheader>Sing in</v-subheader> </button>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-card v-if="!register">
      <v-card-title class="grey lighten-4 py-4 title">
        Sing in
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-flex xs11 offset-xs1>
              <v-text-field
                 prepend-inner-icon="email"
                 label="E-mail"
                 v-model="email"
                 :rules="emailRules"
                 required
               ></v-text-field>
              <br>
              <v-text-field
                prepend-inner-icon="lock"
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <br>
              <div class="danger-alert" v-html="error" />
              <br>
              <v-btn
                dark
                class="green darken-2"
                @click="login">
                Login
              </v-btn>
              <v-btn
                dark
                class="grey darken-2"
                @click.stop="$emit('cancel')">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <button @click="register = true"><v-subheader>Create account</v-subheader> </button>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import AuthenticationService from '@/api/AuthenticationService'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      role: '',
      roles: ['admin', 'manager', 'editer', 'user'],
      emailRules: [
         (v) => !!v || 'E-mail is required',
         (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
       ],
       register: false,
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setRole', response.data.user.role)
        this.email = null
        this.password = null
        this.$emit('cancel')
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async singup () {
      try {
        const response = await AuthenticationService.register({
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setRole', response.data.user.role)
        this.email = null
        this.password = null
        this.role = null
        this.register = false
        this.$emit('cancel')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
