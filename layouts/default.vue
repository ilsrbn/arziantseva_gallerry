<template>
  <div class="layout layout__default">
    <SidebarComponent class="sidebar" />
    <nuxt class="view" />
  </div>
</template>

<script>
import SidebarComponent from '@/components/defaultLayout/Sidebar'
export default {
  name: 'DefaultLayout',
  components: { SidebarComponent },
  beforeMount () {
    document.addEventListener('resize', () => this.resize())
  },
  mounted () {
    this.resize()
  },
  beforeDestroy () {
    document.removeEventListener('resize', () => this.resize())
  },
  methods: {
    resize () {
      const $sidebar = document.querySelector('.sidebar').offsetWidth
      const $view = document.querySelector('.view')
      $view.style.marginLeft = $sidebar + 'px'
      $view.style.maxWidth = `calc(100vw - ${$sidebar}px)`
    }
  }
}
</script>

<style scoped lang="scss">
.layout {
  background: var(--main-color);
  width: 100%;

  .sidebar {
    position: fixed;
    //width: 250px;
    left: 0;
    top: 0;
    height: 100vh;
  }
  .view {
    //margin-left and max-width updated dynamically using js
    //background: linear-gradient(to top, red, blue);
    height: 200vh;
    width: 100%;
  }
}
</style>
