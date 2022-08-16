<template>
  <v-row>
    <v-col>
      {{ content }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ViewGallery',
  layout: 'dashboard',
  data: () => ({
    loading: true,
    content: null
  }),
  async created () {
    try {
      // const { data } = await this.$axios.$get('/admin/blog/item-attachments?blog_item_id=' + this.$route.params.id)
      const { data } = await this.$axios.$get('/admin/blog/items/' + this.$route.params.id)
      this.content = data
    } catch (e) {
      console.log(e)
      this.$toast.error(e.message)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
