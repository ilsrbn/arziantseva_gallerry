<template>
  <section>
    <div class="page__container">
      <div v-for="(category, i) in categories" :key="i" class="category" @click="$router.push(`/categories/${category.id}`)">
        {{ formatTitle(category.title) }}
      </div>
    </div>
    <div class="page__container-mobile">
      <VueSlickCarousel v-bind="slider.setting" @beforeChange="(oldId, id) => slider.active = id + 1">
        <div v-for="(category, i) in categories" :key="i" @click="$router.push(`/categories/${category.id}`)">
          <div class="category" :class="{ hidden: slider.active !== i + 1 }">
            {{ formatTitle(category.title) }}
          </div>
        </div>
      </VueSlickCarousel>
      <div class="slider__data">
        <span>{{ slider.active }}</span>/<span>{{ categories.length }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Categories',
  async asyncData ({ $axios }) {
    const { items: { data } } = await $axios.$get('/blog/posts/gallery?order_by=id')
    const categories = data
    return { categories }
  },
  data: () => ({
    slider: {
      setting: {
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
        arrows: false,
        slidesToScroll: 1,
        draggable: false
      },
      active: 1
    },
    loading: true
  }),
  methods: {
    formatTitle (title) {
      return title.length > 12 ? title.substr(0, 12) + '...' : title
    }
  }
}
</script>

<style scoped lang="scss">
section {
}
.page__container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  padding-top: 107px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.page__container-mobile {
  display: none;
  margin-top: auto;
  margin-bottom: auto;
  @media screen and (max-width: 768px) {
    display: block;
  }
  .category {
    // Font
    font-family: 'Raleway',serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;

    /* identical to box height */
    letter-spacing: 0.1em;
    text-transform: uppercase;

    color: #FFFFFF;

    // Block
    margin: 0 20px;
    aspect-ratio: 0.857142857143;
    @media screen and (max-width: 500px) {
      aspect-ratio: 0.5;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("~/assets/images/under_construction.webp");
    background-position: center;
    background-size: cover;
    max-width: 100%;
    //background: rgba($color: white, $alpha: 0);
    //transition: all 150ms ease-in;
    cursor: pointer;
    position: relative;
    text-shadow: 0px 0px 5px rgba($color: black, $alpha: 1);
    &:before {
      content: "";
      position: absolute;
      left: 0; right: 0;
      top: 0; bottom: 0;
      background: rgba(0,0,0,.0);
      transition: all 300ms ease-out;
    }
    &:hover {
      //background: rgba($color: white, $alpha: .2);
    }
  }
  .category.hidden {
    text-shadow: 0px 0px 15px rgba($color: black, $alpha: 0);
    &:before {
      background: rgba(0,0,0,.52);
    }
  }
}
.slider__data {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  margin-top: 12px;
  text-align: center;
  justify-content: center;
  width: 100%;
}
.category {
  // Font
  font-family: 'Raleway',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;

  /* identical to box height */
  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: #FFFFFF;
  text-shadow: 0px 0px 15px rgba($color: black, $alpha: 0);

  // Block
  margin: 0 20px;
  aspect-ratio: 0.857142857143;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("~/assets/images/under_construction.webp");
  background-position: center;
  background-size: cover;
  max-width: 100%;
  //background: rgba($color: white, $alpha: 0);
  transition: all 150ms ease-in;
  cursor: pointer;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: 0; right: 0;
    top: 0; bottom: 0;
    background: rgba(0,0,0,.52);
    transition: all 300ms ease-out;
  }
  &:hover {
    text-shadow: 0px 0px 5px rgba($color: black, $alpha: 1);
    &:before {
      background: rgba(0, 0, 0, 0);
    }
  }
}
</style>
