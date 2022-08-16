<template>
  <div>
    <v-row>
      <v-col>
        <!-- Контент помещенный в слот header будет оставаться всегда наверху -->
        <slot name="header" />
      </v-col>

      <v-col cols="12" class="scrollable__container">
        <div class="scrollable__content">
          <!-- Контейнер в высоту не привысит высоту вьюпорта экрана и он будет скролиться -->
          <slot />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ScrollableLayout',
  mounted () {
    const scrollable$ = document.querySelector('.scrollable__content')
    const scrollablePosFromTop = this.getOffset(scrollable$).top
    const viewportHeight = window.innerHeight
    const scrollableWrapperHeight = viewportHeight - scrollablePosFromTop - 12
    const scrollableContainer$ = document.querySelector('.scrollable__container')
    scrollableContainer$.style.maxHeight = `${scrollableWrapperHeight}px`
    scrollableContainer$.style.height = `${scrollableWrapperHeight}px`
  },
  methods: {
    getOffset (el) {
      const rect = el.getBoundingClientRect()
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      }
    }
  }
}
</script>
<style scoped lang="scss">
.scrollable__container {
  overflow-y: scroll;
}
</style>
