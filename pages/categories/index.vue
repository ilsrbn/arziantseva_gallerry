<template>
  <div class="page__container">
    <div v-for="(category, i) in categories" :key="i" class="category" @click="$router.push(`/categories/${category.id}`)">
      {{ category.title }}
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Categories',
  data: () => ({
    categories: [],
    loading: true
  }),
  async created () {
    try {
      const { items: { data } } = await this.$axios.$get('/blog/posts/gallery?order_by=id')
      this.categories = data
    } catch (e) {
      console.log(e)
      this.$toast.error(e)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.page__container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 500px);
  gap: 30px;
  padding-top: 107px;
}
.category {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  background: rgba($color: white, $alpha: 0);
  transition: all 150ms ease-in;
  cursor: pointer;
  &:hover {
    background: rgba($color: white, $alpha: .2);
  }
}
</style>
