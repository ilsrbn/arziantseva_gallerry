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
  methods: {
    ...mapMutations({
      switchMenu: 'menu/switchMenu'
    })
  }
}
</script>

<style scoped>
</style>
