<template>
  <div id="app" class="login">
    <h2 class="login__title">
      Login
    </h2>
    <v-text-field v-model="email" :disabled="loading" label="Email" />
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
    email: null,
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
    async submit () {
      this.loading = true
      try {
        await this.$auth.loginWith('laravelJWT', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$toast.success('Successfully logged in!')
        this.$router.push('/admin')
      } catch (e) {
        // console.log(e.message)
        this.$toast.error(e.message)
        // const errors = e.response.data.errors
        // for (const name in errors) {
        //   errors[name].forEach(el => this.$toast.error(el))
        // }
      } finally {
        this.loading = false
      }
      // const isMatch = this.compare(this.username, this.password)
      // if (!isMatch) {
      //   this.$toast.error('Bad credentials provided')
      //   this.loading = false
      //   return
      // }
      // this.setUser()
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
