<template>
  <nuxt-link to="/">
    <span>Arziantseva</span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'LogoComponent'
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
span {
  font-family: 'Dancing Script', cursive;
  color: var(--secondary-color);
  font-size: 48px;
  cursor: pointer;
  transition: all 150ms;
  text-shadow: 0px 0px 5px rgba($color: var(--secondary-color), $alpha: 1);
  &:hover {
    color: var(--accent2-color);
    text-shadow: 0px 0px 5px rgba($color: var(--accent2-color), $alpha: 1);
  }
  &:active {
    color: var(--accent-color) !important;
    text-shadow: 0px 0px 5px rgba($color: var(--accent-color), $alpha: 1);
  }
}
</style>
