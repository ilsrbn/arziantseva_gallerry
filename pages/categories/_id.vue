<template>
  <div class="view">
    <h1 class="text-center header">{{ title }}</h1>
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
          default: 16, 420: 8
        }"
      >
        <img v-for="(img, id) in photos" :key="id" :src="img.file_url" :style="{ maxWidth: '100%', minWidth: '100%', marginBottom: '16px' }" alt="Portraits">
      </masonry>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'CategoryId',
  data: () => ({
    photos: [],
    title: ''
  }),
  computed: {
    path () {
      return this.$route.params.id
    }
  },
  async created () {
    try {
      const data = await this.$axios.$get(`/blog/items/${this.path}`)

      this.title = data.title
      this.photos = data.attachments
    } catch (e) {
      this.$toast.error(e)
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.view {
  padding-top: 31px;
}
.header {
  margin-bottom: 40px;
}

</style>
