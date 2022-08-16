<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped
      app
      class="elevation-4"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-btn class="mr-2" color="accent" @click="toHome()">
        Back to client site
        <v-icon right>
          mdi-exit-to-app
        </v-icon>
      </v-btn>

      <v-btn color="red" @click="logout()">
        Logout
        <v-icon right>
          mdi-logout
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: ['auth'],
  data () {
    return {
      clipped: true,
      drawer: null,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Main',
          to: '/admin'
        },
        {
          icon: 'mdi-view-gallery',
          title: 'Gallery',
          to: '/admin/gallery'
        },
        {
          icon: 'mdi-post',
          title: 'Pages',
          to: '/admin/posts'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Arziantseva dashboard'
    }
  },
  mounted () {
    const width = window.innerWidth
    this.drawer = width >= 768
  },
  methods: {
    logout () {
      this.$auth.logout()
      this.toHome()
    },
    toHome () {
      this.$router.push('/')
    }
  }
}
</script>
