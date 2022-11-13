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
body {
  background-color: var(--background-color);
}
.layout {
  background: var(--background-color);
  width: 100%;
  display: flex;
  flex-direction: column;
  .view {
    min-height: calc(100vh - 185px);
    margin: 85px auto 0;
    //margin-left and max-width updated dynamically using js
    //background: linear-gradient(to top, red, blue);
    width: 100%;
    max-width: calc(100% - 88px);
    padding-bottom: 50px;

    position: relative;
    @media screen and (max-width: 998px) {
      max-width: calc(100% - 32px);
    }
  }
}
</style>
