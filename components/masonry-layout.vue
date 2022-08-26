<template>
  <client-only>
    <masonry
      class="masonry"
      :cols="{
        default: 4,
        2000: 3,
        1200: 2,
        768: 1
      }"
      :gutter="{
        default: 20, 420: 16
      }"
    >
      <LazyImage v-for="(image, i) in images" :key="i" :image="image" @removeImage="removeImage" />
    </masonry>
  </client-only>
</template>

<script>
import LazyImage from '@/components/admin/LazyImage'
export default {
  name: 'MasonryLayout',
  components: { LazyImage },
  props: ['images']
}
</script>

<style scoped>

</style>
