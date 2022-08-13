<template>
  <div>
    <ClockLoader class="clockPreloader" :loading="loading" />
    {{ posts }}
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data: () => ({
    loading: true,
    posts: []
  }),
  async mounted () {
    try {
      const { data } = await this.$axios.$get('http://45.129.97.246/api/blog/posts/gallery')
      this.posts = data
    } catch (e) {
      this.$toast.error('Oops...\nSomething went wrong.\nPage will be refreshed automatically in 5 seconds')
      this.$router.go()
    } finally {
      this.loading = false
    }
  },
  methods: {

  }
}
</script>
