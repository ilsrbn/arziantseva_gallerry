<template>
  <div id="app" class="login">
    <h2 class="login__title">
      Login
    </h2>
    <v-text-field v-model="username" :disabled="loading" label="Username" />
    <v-text-field v-model="password" type="password" :disabled="loading" label="Password" />
    <v-btn
      :loading="loading"
      :disabled="loading"
      elevation="0"
      block
      class="login__button"
      @click="submit"
    >
      Login
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
  layout: 'auth',
  data: () => ({
    loading: false,
    username: null,
    password: null
  }),
  mounted () {
    const status = this.$route.query.status
    if (status === 'expired') {
      this.$toast.show('Your session is expired. Please try login again', {
        duration: 5000
      })
    }
  },
  methods: {
    submit () {
      this.loading = true
      const isMatch = this.compare(this.username, this.password)
      if (!isMatch) {
        this.$toast.error('Bad credentials provided')
        this.loading = false
        return
      }
      this.setUser()
      this.$toast.success('Successfully logged in!')
      this.$router.push('/admin')
      this.loading = false
    },
    compare (u, p) {
      return !!(u === 'admin' && p === '123456')
    },
    setUser () {
      // const daysInMS = 60 * 60 * 24 * 1000
      const minsInMS = 1000 * 60
      this.$cookies.set('arziantseva_username', 'admin')
      const until = Date.now() + minsInMS * 5
      this.$cookies.set('auth_until', `${until}`)
    }
  }
}
</script>

<style lang="scss">
.login {
  &__title {
    font-weight: normal;
  }

  &__button {
  }

}
</style>
