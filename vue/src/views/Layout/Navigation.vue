<template>
  <div>
    <v-navigation-drawer
    :mini-variant.sync="mini"
    v-model="drawer"
    hide-overlay
    stateless
    enable-resize-watcher
    fixed
    app
    dark
    style="background-color:#262f3d;">
    <v-toolbar flat style="background-color:#262f3d;">
     <v-list v-if="mini">
       <v-list-tile avatar>
         <v-img@click.stop="$emit('navigater')">
           <img src="../../assets/logo.png" class="logo-img">
         </v-img>
       </v-list-tile>
     </v-list>
     <v-list v-if="!mini">
       <v-list-tile avatar>
         <v-img>
           <img src="../../assets/logo.png" class="logo-img">
         </v-img>
         <v-list-tile-content>
           <v-list-tile-title class="title">{{ title }}</v-list-tile-title>
         </v-list-tile-content>
         <v-list-tile-action>
           <v-btn
             icon
             @click.stop="$emit('navigater')"
           >
             <v-icon>chevron_left</v-icon>
           </v-btn>
         </v-list-tile-action>
       </v-list-tile>
     </v-list>
   </v-toolbar>

   <v-divider></v-divider>
      <v-list class="pt-0" dense>
        <template v-for="item in items">
            <v-layout
              v-if="item.heading"
              :key="item.heading"
              row
              align-center
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-layout>
            <v-list-group
              v-else-if="item.children"
              v-model="item.model"
              :key="item.text"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="(child, i) in item.children"
                :key="i"
                @click=""
              >
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="item.text" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  props: ['mini', 'drawer'],
  data () {
    return {
      title: 'Application',
      logoURL: '../../assets/logo.png',
      items: [{
          icon: 'dashboard',
          text: 'Dashboard'
        },
        {
          icon: 'contacts',
          text: 'Contacts'
        },
        {
          icon: 'history',
          text: 'Frequently contacted'
        },
        {
          icon: 'content_copy',
          text: 'Duplicates'
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: true,
          children: [{
            icon: 'add',
            text: 'Create label'
          }]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [{
              text: 'Import'
            },
            {
              text: 'Export'
            },
            {
              text: 'Print'
            },
            {
              text: 'Undo changes'
            },
            {
              text: 'Other contacts'
            }
          ]
        },
        {
          icon: 'settings',
          text: 'Settings'
        },
        {
          icon: 'chat_bubble',
          text: 'Send feedback'
        },
        {
          icon: 'help',
          text: 'Help'
        },
        {
          icon: 'phonelink',
          text: 'App downloads'
        },
        {
          icon: 'keyboard',
          text: 'Go to the old version'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .v-list__group--active {
    background-color: #19212b;
  }
  .logo-img {
    width: 40px;
    height: 40px;
  }
</style>
