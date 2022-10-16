<template>
  <div class="view">
    <h1 class="text-center header">
      {{ title }}
    </h1>
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
    <div class="observable" />
  </div>
</template>

<script>
let observer
export default {
  name: 'CategoryId',
  data: () => ({
    photos: [],
    title: '',
    page: 1,
    limit: 15,
    total: 15
  }),
  async fetch () {
    // await this.$router.push('/')
    try {
      const data = await this.$axios.$get(`/blog/items/${this.path}?${this.query()}`)

      this.title = data.title
      this.photos = data.attachments

      this.total = data.total
    } catch (e) {
      this.$toast.error(e)
      console.log(e)
    }
  },
  computed: {
    path () {
      return this.$route.params.id
    }
  },
  beforeDestroy () {
    observer.disconnect()
  },
  mounted () {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            if (this.page * this.limit <= this.total) {
              this.page += 1
              await this.fetch()
            }
          }
        })
      },
      {
        rootMargin: '-65% 0px 0px 0px'
      }
    )
    const el = document.querySelectorAll('.observable')
    el.forEach((element) => {
      observer.observe(element)
    })
  },
  methods: {
    query () {
      return new URLSearchParams({
        pagination: 1,
        page: this.page,
        limit: this.limit,
        order_by: '-id'
      }).toString()
    },
    async fetch () {
      try {
        const resp = await this.$axios.$get(
          `/blog/items/$${this.path}?${this.query()}`
        )
        this.photos = [...this.photos, ...resp.attachments]
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

</style>
