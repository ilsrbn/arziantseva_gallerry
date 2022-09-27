<template>
  <nuxt-link class="wrapper" :to="link" @click.native="navigate()">
    <span class="el" :class="{small}">
      <slot />
    </span>
    <div class="underscore" />
  </nuxt-link>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'NavLink',
  props: {
    small: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      resetMenu: 'menu/resetMenu'
    }),
    async navigate () {
      await this.$router.push(this.link)

      setTimeout(() => {
        this.resetMenu()
      }, 500)
      // this.resetMenu()
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  display: inline-block;
  text-decoration: none;
  .el {
    font-family: 'Raleway', sans-serif;
    color: var(--text-main-color);
    cursor: pointer;
    text-transform: lowercase;

    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    &.small {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
    }
  }
  .underscore {
    position: absolute;
    background: white;
    height: 2px;
    width: 0;
    bottom: 0;
    left: 0;
    transition: all 150ms ease-in;
  }
  &:hover {
    .underscore {
      width: 100%;
    }
  }
}
</style>
