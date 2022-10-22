<template>
  <transition name="fade">
    <div v-show="slider.opened" class="slider__overflow">
      <button
        class="close__slider"
        @click="$emit('input', -1)"
      >
        <i class="ri-arrow-left-line ri-2x" />
      </button>
      <div class="slider__container">
        <button class="arrow arrow-left" @click="$emit('input', (value - 1 < 0 ? gallery.length - 1 : value - 1))">
          <img src="@/assets/icons/arrow_left.svg" alt="">
        </button>
        <div class="slider__itself">
          <VueSlickCarousel ref="carousel" v-bind="slider.setting">
            <div v-for="(image, i) in gallery" :key="i" class="slider__slide">
              <img :src="image.file_url" alt="">
            </div>
          </VueSlickCarousel>
        </div>
        <button class="arrow arrow-right" @click="$emit('input', (value + 1 === gallery.length ? 0 : value + 1))">
          <img src="@/assets/icons/arrow_right.svg" alt="">
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
let viewPortHeight
export default {
  name: 'SliderView',
  props: {
    gallery: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: -1
    },
    length: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    slider: {
      setting: {
        slidesToShow: 1,
        arrows: false,
        slidesToScroll: 1,
        draggable: false
      },
      opened: false,
      lastScrollPos: -1
    }
  }),
  watch: {
    value () {
      if (this.value === -1) {
        this.slider.opened = false
      } else {
        this.slider.opened = true
        this.$refs.carousel.goTo(this.value)
      }
    },
    length () {
      setTimeout(this.setHeight)
    },
    'slider.opened' () {
      document.querySelector('body').classList.toggle('mobile-nav')
    }
  },
  mounted () {
    const header = document.querySelector('header')
    const headerHeight = header.offsetHeight
    const viewport = window.innerHeight
    viewPortHeight = `${viewport - headerHeight + 80}px`
    this.setHeight()
  },
  methods: {
    setHeight () {
      const slider = document.querySelector('.slider__overflow')
      slider.style.height = viewPortHeight
      const images = document.querySelectorAll('.slider__slide img')
      const slickSlides = document.querySelectorAll('.slick-slide')
      images.forEach((el) => {
        el.style.maxHeight = viewPortHeight
      })
      slickSlides.forEach((el) => {
        el.style.maxHeight = viewPortHeight
        el.style.minHeight = viewPortHeight
      })
    }
  }
}
</script>

<style lang="scss">
.slider__overflow {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  background: black;
  z-index: 501;
  overflow: hidden;
  width: 100%;
  .close__slider {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 502;
  }
  .slider__container {
    max-height: 100%;
    max-width: 1440px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    @media screen and (max-width: 998px) {
      max-width: calc(100% - 100px);
    }
  }
  .arrow {
    //flex: 0 0 40px;
    position: absolute;
    display: flex;
    align-self: center;
    justify-content: center;
    z-index: 505;
    top: 50%;
    transform: translateY(-50%);
  }
  .arrow-left {
    left: 100px;
  }
  .arrow-right {
    right: 100px;
  }
  @media screen and (max-width: 998px) {
    .arrow {
      border-radius: 50%;
      height: 40px;
      width: 40px;
    }
    .arrow-right {
      right: 0;
    }
    .arrow-left {
      left: 0;
    }
  }
  .slider__itself {
    max-height: inherit;
    max-width: 100%;
    //flex: 0 1 auto;
    .slick-slide {
      display: flex !important;
      align-items: center;
      justify-content: center;
      & > div {
        max-height: inherit;
        min-height: 100%;
      }
    }
    .slider__slide {
      display: flex !important;
      max-height: inherit;
      max-width: 100%;
      justify-content: center;
      align-items: center;
    }
    img {
      max-width: 100%;
      //max-height: 100%;
      min-height: 100%;
    }
  }
}
</style>
