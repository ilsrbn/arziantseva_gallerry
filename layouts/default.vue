<template>
  <div class="layout layout__default">
    <Header />
    <nuxt class="view" />
    <Footer class="footer" />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style scoped lang="scss">
.layout {
  background: var(--background-color);
  width: 100%;
  display: flex;
  flex-direction: column;
  .view {
    min-height: calc(100vh - 85px);
    margin: 85px auto 0;
    padding-top: 51px;
    //margin-left and max-width updated dynamically using js
    //background: linear-gradient(to top, red, blue);
    width: 100%;
    max-width: calc(100% - 88px);
    padding-bottom: 50px;
    @media screen and (max-width: 998px) {
      max-width: calc(100% - 32px);
    }
  }
}
</style>
