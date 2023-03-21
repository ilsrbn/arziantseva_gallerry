<template>
  <div class="view">
    <h1 class="text-center header">
      {{ title }}
    </h1>
    <template v-if="description">
      <p v-for="(paragraph, i) of description.split('\n')" :key="i">{{ paragraph }}</p>
    </template>
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
    title: '',
    description: ''
  }),
  async fetch () {
    await this.fetch()
  },
  methods: {
    async fetch () {
      try {
        const resp = await this.$axios.$get(
          '/category/' + this.$route.params.id
        )
        this.title = resp.title
        this.description = resp.description
        this.photos = [...this.photos, ...resp.photos]
      } catch (e) {
        console.log(e)
        this.$toast.error('Oops...\nSomething went wrong.')
      }
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
  text-transform: lowercase;
}
p {
  margin-bottom: 1rem;
}

</style>
