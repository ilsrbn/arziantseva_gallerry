<template>
  <div>
    <ClockLoader :loading="loading" />
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
      const { data } = await this.$axios.$get('/blog/posts/gallery')
      this.posts = data
    } catch (e) {
      this.$toast.error('Oops...\nSomething went wrong.')
    } finally {
      this.loading = false
    }
  },
  methods: {

  }
}
</script>
