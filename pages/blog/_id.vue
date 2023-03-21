<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ formatDate(new Date(post.updated_at)) }}</p>
    <div class="gallery">
      <swiper :options="galleryOptions">
        <swiper-slide v-for="image in post.featured_photos" :key="image">
          <img :src="image" :height="pageHalfHeight" />
        </swiper-slide>
      </swiper>
    </div>
    <hr />
    <div class="content-wrapper">
      <div class="content" v-html="post.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      galleryOptions: {
        slidesPerView: "auto",
        spaceBetween: 25,
        slidesPerGroup: 1,
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 5000,

          disableOnInteraction: false,
        },
      },
      post: {},
    };
  },
  computed: {
    pageHalfHeight() {
      if (!window) return 540;
      return window.innerHeight / 2;
    },
  },
  async created() {
    await this.fetchPost();
  },

  methods: {
    formatDate(date) {
      return date.toLocaleDateString().replaceAll("/", ".");
    },

    async fetchPost() {
      this.post = await this.$axios.$get("/post/" + this.$route.params.id);
    },
  },
};
</script>

<style scoped lang="scss">
.swiper-slide {
  width: auto;
}
h1 {
  text-align: center;
}
p {
  text-align: right;
  margin-block: 0.5em;
  line-height: 1.2em;
}
hr {
  margin-block: 2rem;
}
</style>
