<template>
  <section class="blog-layout">
    <div class="blog-layout__wrapper">
      <div
        v-for="(post, i) in posts"
        :key="i"
        class="post"
        :class="{ inverted: post.meta.inverted }"
      >
        <div class="post__images">
          <swiper :options="options" ref="swiper">
            <swiper-slide v-for="image in post.featured_photos" :key="image">
              <img :src="image" height="525" />
            </swiper-slide>
          </swiper>
          <div class="post__images-navigation">
            <button
              id="left"
              class="navigation__button"
              @click="prevSlide($refs.swiper[i])"
            >
              <i class="ri-arrow-drop-left-fill"></i>
            </button>
            <button
              id="right"
              class="navigation__button"
              @click="nextSlide($refs.swiper[i])"
            >
              <i class="ri-arrow-drop-right-fill"></i>
            </button>
          </div>
        </div>
        <div class="post__text">
          <nuxt-link :to="post.meta.href">
            <h1>{{ post.title }}</h1>
          </nuxt-link>
          <span class="post__date">
            {{ formatDate(new Date(post.updated_at)) }}
          </span>
          <div class="post__content" v-html="post.content"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Blog",
  data: () => ({
    posts: [],
    options: {
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
  }),
  async created() {
    await this.fetch();
  },
  methods: {
    nextSlide(swiper) {
      const instance = swiper.$swiper;
      instance.slideNext();
    },
    prevSlide(swiper) {
      const instance = swiper.$swiper;
      instance.slidePrev();
    },
    async fetch() {
      try {
        const resp = await this.$axios.$get("/post");
        this.posts = this.mapPost(resp.data);
      } catch (e) {
        console.error({ e });
      }
    },
    formatDate(date) {
      return date.toLocaleDateString().replaceAll("/", ".");
    },
    mapPost(data) {
      return data.map((post, i) => ({
        ...post,
        meta: { inverted: i % 2, href: `/blog/${post.id}` },
      }));
    },
  },
};
</script>

<style lang="scss">
.swiper-container {
  max-height: 100%;
}

.swiper-slide {
  width: auto;
}

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
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-height: 525px;
  width: 100vw;
  width: 100svw;

  @media screen and (max-width: 980px) {
    grid-template-columns: 1fr;
  }

  &.inverted {
    .post__images {
      order: 2;
    }

    .post__text {
      order: 1;
    }
  }

  &__images {
    max-height: inherit;
    max-width: 100%;
    overflow: hidden;
    position: relative;

    @media screen and (max-width: 980px) {
      display: none;
    }

    img {
      max-height: inherit;
    }

    &-navigation {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: space-between;

      z-index: 15;

      .navigation__button {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
        font-size: 4rem;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        opacity: 0;

        transition: all 150ms ease-in;

        &:hover {
          background: rgba(0, 0, 0, 0.4);
        }
      }

      &:hover {
        .navigation__button {
          opacity: 1;
        }
      }
    }
  }

  &__text {
    flex: 0 1 auto;
    margin-inline: 50px;
    -webkit-box-shadow: inset 0px -10px 18px -5px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: inset 0px -10px 18px -5px rgba(0, 0, 0, 0.75);
    box-shadow: inset 0px -10px 18px -5px rgba(0, 0, 0, 0.75);
    overflow: hidden;

    @media screen and (max-width: 980px) {
      max-height: inherit;
    }
  }

  &__date {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 300;
    font-size: 36px;
    line-height: 42px;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    color: #d9d9d9;
  }

  &__content {
    height: 50%;
    overflow: hidden;
    margin-top: calc(4em * 1.2);

    h1 {
      font-family: Raleway;
      font-size: 36px;
      font-weight: 800;
      line-height: 42px;
      letter-spacing: 0.1em;
      text-align: left;
    }

    p {
      margin-bottom: 25px;
      font-size: 20px;
      font-weight: 400;
      line-height: 23px;
      letter-spacing: 0.1em;
      text-align: left;
    }
  }
}
</style>
