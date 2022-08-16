<template>
  <div class="auth">
    <div class="auth__container">
      <div class="auth__form">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  middleware: ['guest']
}
</script>

<style lang="scss">
.auth {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &__container {
    padding: 32px 24px;
    border: 1px solid #a0a0a0;
    border-radius: 6px;
    width: 100%;
    max-width: 640px;
    margin: 0 24px;
  }
}
</style>
