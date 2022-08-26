<template>
  <div class="wrapper">
    <span class="el" :class="{small}">
      <slot />
    </span>
    <div class="underscore" />
  </div>
</template>

<script>
export default {
  name: 'NavLink',
  props: {
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  overflow: hidden;
  position: relative;
  display: inline-block;
  .el {
    font-family: 'Inter', sans-serif;
    color: var(--text-main-color);
    cursor: pointer;
    overflow: hidden;

    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0;
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
    border: 1px solid white;
    height: 2px;
    width: 100%;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    transition: all 150ms ease-in;
  }
  &:hover {
    .underscore {
      transform: translateX(0);
    }
  }
}
</style>
