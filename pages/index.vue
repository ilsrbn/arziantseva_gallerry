<template>
  <div class="view">
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
        <img
          v-for="(img, id) in pages"
          :key="id"
          :src="img.file_url"
          :style="{ maxWidth: '100%', minWidth: '100%', marginBottom: '16px' }"
          alt="Portraits"
          @contextmenu.prevent
          @drag.prevent
          @dragstart.prevent
        >
      </masonry>
    </client-only>
    <div class="observable" />
  </div>
</template>

<script>
let observer
export default {
  name: 'MainPage',
  data: () => ({
    pages: [],
    page: 1,
    limit: 15,
    total: 15
  }),
  async created () {
    try {
      const resp = await this.$axios.$get(`/blog/item-attachments?${this.query()}`)
      this.total = resp.total
      this.pages = resp.data
    } catch (e) {
      console.log(e)
      this.$toast.error('Oops...\nSomething went wrong.')
    }
  },
  beforeDestroy () {
    observer.disconnect()
  },
  mounted () {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          if (this.page * this.limit <= this.total) {
            this.page += 1
            await this.fetch()
          }
        }
      })
    }, {
      rootMargin: '-65% 0px 0px 0px'
    })
    const el = document.querySelectorAll('.observable')
    console.log(el)
    el.forEach((element) => {
      observer.observe(element)
    })
  },

  methods: {
    query () {
      return new URLSearchParams({ pagination: 1, page: this.page, limit: this.limit, order_by: '-id' }).toString()
    },
    async fetch () {
      try {
        const resp = await this.$axios.$get(`/blog/item-attachments?${this.query()}`)
        this.pages = [...this.pages, ...resp.data]
      } catch (e) {
        console.log(e)
        this.$toast.error('Oops...\nSomething went wrong.')
      }
    }
  }
}
</script>
<style lang="scss">
.view {
  padding-top: 51px;
  min-height: 100vh;
}
</style>
