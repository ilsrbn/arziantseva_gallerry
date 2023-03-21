<template>
  <section v-if="categories.length">
    <div class="page__container">
      <div
        v-for="(category, i) in categories"
        :key="i"
        class="category"
        @click="$router.push(`/categories/${category.id}`)"
        :style="{ backgroundImage: `url(${category.cover})` }"
      >
        <span>{{ formatTitle(category.title) }}</span>
      </div>
    </div>
    <div class="page__container-mobile">
      <swiper :options="options">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <div
            class="category"
            @click="$router.push(`/categories/${category.id}`)"
          >
            <img :src="category.cover" />
            <span>{{ formatTitle(category.title) }}</span>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Categories",
  data: () => ({
    options: {
      centeredSlides: true,
      spaceBetween: 30,
      slidesPerView: 1.5,
      slidesPerGroup: 1,
      loop: true,
    },

    categories: [],
  }),
  async created() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      const resp = await this.$axios.$get("/category?");
      this.categories = resp.data.map((category) => {
        return {
          id: category.id,
          title: category.title,
          cover: category.cover.file_url,
        };
      });
    },
    formatTitle(title) {
      return title.length > 12 ? title.substr(0, 12) + "..." : title;
    },
  },
};
</script>

<style scoped lang="scss">
// Desktop + Tablet Grid
.page__container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: calc((100vw - 60px) / 3 * 1.2);
  gap: 30px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }

  .category {
    // Font
    font-family: "Raleway", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;

    letter-spacing: 0.1em;
    text-transform: uppercase;

    color: #ffffff;
    text-shadow: 0px 0px 15px rgba($color: black, $alpha: 0);

    // Block
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("~/assets/images/under_construction.webp");
    background-position: center;
    background-size: cover;
    max-width: 100%;

    transition: all 150ms ease-in;
    cursor: pointer;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.52);
      transition: all 300ms ease-out;
    }

    span {
      z-index: 50;
    }

    &:hover {
      text-shadow: 0px 0px 5px rgba($color: black, $alpha: 1);

      &:before {
        background: rgba(0, 0, 0, 0);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  section {
    display: flex;
  }
}

// Mobile slider
.page__container-mobile {
  display: none;
  width: inherit;

  @media screen and (max-width: 768px) {
    display: flex;
  }

  align-items: center;
  min-height: 100%;

  .category {
    position: relative;

    img {
      object-fit: cover;
      max-width: 100%;
    }

    span {
      position: absolute;
      inset: 0;
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;

      font-family: "Raleway", serif;
      font-style: normal;
      font-weight: 400;
      font-size: 32px;
      line-height: 38px;

      letter-spacing: 0.1em;
      text-transform: uppercase;

      color: #ffffff;
    }
  }

  .swiper-slide {
    opacity: 0.4;
    transition: all 300ms ease-in;

    &-active {
      opacity: 1;
    }
  }
}
</style>
