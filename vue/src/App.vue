<template>
  <v-app id="inspire">
    <navigation :mini="mini" :drawer="drawer" v-on:navigater="mini = !mini"></navigation>
    <toolbar :mini="mini" v-on:navigater="mini = !mini"></toolbar>
    <v-content>
      <v-container fluid>
        <transition  name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Navigation from '@/views/Layout/Navigation.vue'
  import Toolbar from '@/views/Layout/Toolbar.vue'
  export default {
    data: () => ({
      drawer: true,
      mini: false
    }),
    components: { Navigation, Toolbar },
    props: {
      source: String
    }
  }
</script>

<style>
.fade-enter-active, .fade-leave-active {
  /* transition: opacity .5s; */
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
