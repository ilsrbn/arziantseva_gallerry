<template>
  <div id="app" class="login">
    <h2 class="login__title">Login</h2>
    <v-container>
      <v-form class="form">
        <v-text-field
          ref="email"
          v-model="email"
          outlined
          class="email"
          :disabled="loading"
          label="Email"
        />
        <v-text-field
          v-model="password"
          outlined
          class="password"
          type="password"
          :disabled="loading"
          label="Password"
        />
        <v-btn
          type="submit"
          :loading="loading"
          :disabled="loading"
          elevation="0"
          block
          class="login__button"
          @click.prevent="submit"
        >
          Login
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "LoginPage",
  layout: "auth",
  data: () => ({
    loading: false,
    email: null,
    password: null,
  }),
  mounted() {
    const email = document.querySelector(".email input");
    email.focus();
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        this.$toast.success("Successfully logged in!");
        this.$router.push("/admin");
      } catch (e) {
        console.log(e);
        this.$toast.error(e.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
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
