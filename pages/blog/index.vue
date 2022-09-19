<template>
  <section class="blog-layout">
    <div class="blog-layout__wrapper">
      <div v-for="(post, i) in posts" :key="i" class="post" :class="{inverted: i % 2 !== 0}">
        <div class="post__images">
          <div class="post__images-wrapper" />
        </div>
        <div class="post__text">
          <span class="post__date">
            {{ formatDate(new Date(post.updated_at)) }}
          </span>
          <div class="post__content" v-html="post.raw_content" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Blog',
  data: () => ({ posts: [] }),
  async created () {
    try {
      const { items: { data } } = await this.$axios.$get('/blog/posts/blog')
      this.posts = data
    } catch (e) {
      this.$toast.error(e)
      console.log(e)
    }
  },
  methods: {
    formatDate (date) {
      return date.toLocaleDateString().replaceAll('/', '.')
    }
  }
}
</script>

<style lang="scss">
.blog-layout {
  margin-left: 0 !important;
  margin-right: 0 !important;
  max-width: 100vw !important;
}
.blog-layout__wrapper {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 77px;
}

.post {
  display: flex;
  align-items: center;
  gap: 50px;
  &.inverted {
    .post__images {
      flex: 0 0 55%;
      order: 2;
    }
    .post__text {
      flex: 0 1 auto;
      order: 1;
    }
  }
  &__images {
    flex: 0 0 50%;
  }
  &__text {
    flex: 0 1 auto;
  }
  &__date {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: 36px;
    line-height: 44px;

    /* identical to box height */
    text-transform: uppercase;
    color: black;
    -webkit-text-stroke: 1px white;
  }
  &__content {
    h1 {
      font-family: 'Inter', sans-serif;
      font-style: normal !important;
      font-weight: 800 !important;
      font-size: 36px;
      line-height: 44px;

      /* identical to box height */
      text-transform: uppercase;
      margin-bottom: 50px;
      text-decoration: none;
    }
    p {
      margin-bottom: 25px;
    }
  }
}
</style>
