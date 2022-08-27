<template>
  <div>
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
  name: 'MainPage',
  data: () => ({
    loading: true,
    posts: [],
    photos: []
  }),
  async mounted () {
    try {
      const { data } = await this.$axios.$get('/blog/item-attachments?order_by=-id')
      this.photos = data
    } catch (e) {
      console.log(e)
      this.$toast.error('Oops...\nSomething went wrong.')
    } finally {
      this.loading = false
    }
  },
  methods: {
    async fetchPhotos () {
      for (const category of this.posts) {
        const data = await this.$axios.$get(`/blog/items/${category.id}`)
        this.photos = [...this.photos, ...data.attachments]
      }
    }
  }
}
</script>
