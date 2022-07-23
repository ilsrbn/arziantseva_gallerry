<template>
  <div id="app" class="login">
    <h2 class="login__title">
      Login
    </h2>
    <v-text-field label="Username" />
    <v-text-field label="Password" />
    <v-btn elevation="0" block class="login__button">
      Login
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
  layout: 'auth'
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
