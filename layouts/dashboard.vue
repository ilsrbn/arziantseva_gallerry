<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
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
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <!--      <v-btn-->
      <!--        icon-->
      <!--        @click.stop="clipped = !clipped"-->
      <!--      >-->
      <!--        <v-icon>mdi-application</v-icon>-->
      <!--      </v-btn>-->
      <!--      <v-btn-->
      <!--        icon-->
      <!--        @click.stop="fixed = !fixed"-->
      <!--      >-->
      <!--        <v-icon>mdi-minus</v-icon>-->
      <!--      </v-btn>-->
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-btn class="mr-2" color="accent" @click="toHome()">
        <span class="mr-1">Back to client site</span>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>

      <v-btn color="red" @click="logout()">
        <span class="mr-1">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!--    <v-navigation-drawer-->
    <!--      v-model="rightDrawer"-->
    <!--      :right="right"-->
    <!--      temporary-->
    <!--      fixed-->
    <!--    >-->
    <!--      <v-list>-->
    <!--        <v-list-item @click.native="right = !right">-->
    <!--          <v-list-item-action>-->
    <!--            <v-icon light>-->
    <!--              mdi-repeat-->
    <!--            </v-icon>-->
    <!--          </v-list-item-action>-->
    <!--          <v-list-item-title>Switch drawer (click me)</v-list-item-title>-->
    <!--        </v-list-item>-->
    <!--      </v-list>-->
    <!--    </v-navigation-drawer>-->
    <!--    <v-footer-->
    <!--      :absolute="fixed"-->
    <!--      app-->
    <!--    >-->
    <!--      <span>&copy; {{ new Date().getFullYear() }}</span>-->
    <!--    </v-footer>-->
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: 'allowDashboard',
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Main',
          to: '/admin'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Pages',
          to: '/admin/pages'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Arziantseva dashboard'
    }
  },
  methods: {
    logout () {
      this.$cookies.remove('arziantseva_username')
      this.$cookies.remove('auth_until')
      this.$router.push('/')
    },
    toHome () {
      this.$router.push('/')
    }
  }
}
</script>
