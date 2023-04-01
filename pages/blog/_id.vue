<template>
  <div class="blog-post" data-app v-if="loaded">
    <v-dialog v-model="dialog" max-width="800">
      <img :src="selectedImage" />
    </v-dialog>
    <h1>{{ post.title }}</h1>
    <p>{{ formatDate(new Date(post.updated_at)) }}</p>
    <div class="gallery">
      <swiper :options="options" ref="swiper">
        <swiper-slide v-for="image in post.featured_photos" :key="image">
          <img
            :height="pageHalfHeight"
            :src="image"
            @click="openModal(image)"
          />
        </swiper-slide>
      </swiper>
      <div class="gallery-navigation">
        <button id="left" class="navigation__button" @click="prevSlide">
          <i class="ri-arrow-drop-left-fill"></i>
        </button>
        <button id="right" class="navigation__button" @click="nextSlide">
          <i class="ri-arrow-drop-right-fill"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="content-wrapper">
      <div class="content" v-html="post.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loaded: false,
    dialog: false,
    selectedImage: null,
    options: {
      observeParents: true,
      observer: true,
      resizeObserver: false,
      mousewheel: true,
      speed: 1000,
      spaceBetween: 25,
      height: 525,
      slidesPerGroup: 1,
      slidesPerView: "auto",
      loop: true,
      autoplay: {
        delay: 5000,
      },
    },

    post: {},
  }),
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
    openModal(img) {
      this.dialog = true;
      this.selectedImage = img;
    },
    nextSlide() {
      this.$refs.swiper.$swiper.slideNext();
    },
    prevSlide() {
      console.log("hadnled");
      this.$refs.swiper.$swiper.slidePrev();
    },
    formatDate(date) {
      return date.toLocaleDateString().replaceAll("/", ".");
    },

    async fetchPost() {
      try {
        this.post = await this.$axios.$get("/post/" + this.$route.params.id);
        this.loaded = true;
      } catch (e) {
        console.log({ e });
      }
    },
  },
};
</script>

<style lang="scss">
.gallery {
  position: relative;
  width: 100%;

  img {
    z-index: 499;
  }

  &-navigation {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: space-between;

    .navigation__button {
      width: 5%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      font-size: 4rem;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      opacity: 0;

      z-index: 500;
      transition: all 150ms ease-in;

      &:hover {
        background: rgba(0, 0, 0, 0.4);
      }
    }
  }

  &:hover {
    .navigation__button {
      opacity: 1;
    }
  }
}

.blog-post {
  .swiper-slide {
    width: auto;
    z-index: 14;
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
