<template>
  <nav-link :link="'/'" class="logo">
    arziantseva
  </nav-link>
</template>

<script>
export default {
  name: 'LogoComponent'
}
</script>

<style lang="scss">
a.logo .el {
  text-decoration: none;
  letter-spacing: .4em !important;
  font-weight: 500 !important;
  font-size: 25px !important;
}

</style>
