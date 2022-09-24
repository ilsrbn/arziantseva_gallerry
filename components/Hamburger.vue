<template>
  <button class="hamburger hamburger--squeeze" :class="{'is-active': open}" type="button" @click="switchMenu()">
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Hamburger',
  computed: {
    ...mapGetters({
      open: 'menu/open'
    })
  },
  data: () => ({
    scrollPos: 0
  }),
  methods: {
    ...mapMutations({
      switchMenu: 'menu/switchMenu'
    })
    // switchOpen () {
    //   if (!this.open) {
    //     this.scrollPos = window.scrollY
    //     console.log(this.scrollPos)
    //     this.switchMenu()
    //   } else {
    //     this.switchMenu()
    //     setTimeout(() => {
    //       window.scrollTo(0, this.scrollPos)
    //     }, 0)
    //   }
    // }
  }
}
</script>

<style scoped>
@import "assets/hamburgers.css";
</style>
