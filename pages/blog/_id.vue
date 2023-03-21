<template>
  <div class="blog-post">
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

<style lang="scss">
.blog-post {
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
  h1,
  p,
  hr,
  .content {
    margin-inline: auto;
    padding-inline: 24px;
    max-width: 800px;
    width: 100%;
  }

  .content {
    p {
      text-align: unset;
    }
    h1 {
      font-size: 2em;
      text-align: unset;
    }
    h2 {
      font-size: 1.5em;
    }
    h3 {
      font-size: 1.17em;
    }
    h4 {
      font-size: 1em;
    }
    h5 {
      font-size: 0.83em;
    }
    h6 {
      font-size: 0.67em;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    img {
      display: block;
      line-height: 1.2em;
      margin-block: 2rem;
      width: 100%;
    }
  }
}
</style>
