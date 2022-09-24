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
    await this.$router.push('/')
    // try {
    //   const { items: { data } } = await this.$axios.$get('/blog/posts/gallery?order_by=id&nocache=' + Date.now())
    //   this.categories = data
    // } catch (e) {
    //   console.log(e)
    //   this.$toast.error(e)
    // }
  }
}
</script>

<style scoped lang="scss">
.page__container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding-top: 107px;
}
.category {
  flex: 0 1 calc(33.333% - 20px);
  @media screen and (max-width: 1200px) {
    flex: 0 1 calc(50% - 15px);
  }
  @media screen and (max-width: 768px) {
    flex: 1 1 100%;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  //border: 1px solid white;
  background: rgba($color: white, $alpha: 0);
  transition: all 150ms ease-in;
  cursor: pointer;
  &:hover {
    background: rgba($color: white, $alpha: .2);
  }
}
</style>
