<template>
  <nav-link :link="'/'" class="uppercase logo">
    Arziantseva
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
  letter-spacing: .5em !important;
  font-weight: 600 !important;
}

</style>
