<template>
  <div>
    <v-row>
      <v-col>
        <v-sheet rounded="xl" class="px-2 py-2">
          <v-btn class="ml-auto" outlined rounded color="primary" @click.stop="dialog = true">
            <v-icon left>
              mdi-upload
            </v-icon> UPLOAD
          </v-btn>
        </v-sheet>
      </v-col>

      <v-col cols="12" class="masonry__scrollable">
        <masonry
          v-show="loading"
          class="masonry"
          :cols="{
            default: 4,
            2000: 3,
            1200: 2,
            768: 1
          }"
          :gutter="{
            default: 20, 420: 16
          }"
        >
          <LazyImage v-for="(image, i) in images" :key="i" :image="image" @removeImage="removeImage" />
        </masonry>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="1500">
      <UploadImageModal @showImages="showImages" />
    </v-dialog>
  </div>
</template>

<script>
import LazyImage from '~/components/admin/LazyImage'
import UploadImageModal from '~/components/admin/UploadImageModal'
export default {
  name: 'MainDashboardPage',
  components: {
    UploadImageModal,
    LazyImage
  },
  layout: 'dashboard',
  data: () => ({
    dialog: false,
    loading: true,
    images: []
  }),
  mounted () {
    const masonry$ = document.querySelector('.masonry')
    const masonryPosFromTop = this.getOffset(masonry$).top
    const viewportHeight = window.innerHeight
    const masonryWrapperHeight = viewportHeight - masonryPosFromTop - 12
    const masonryScrollable$ = document.querySelector('.masonry__scrollable')
    masonryScrollable$.style.maxHeight = `${masonryWrapperHeight}px`
    masonryScrollable$.style.height = `${masonryWrapperHeight}px`
    this.loading = false
  },
  methods: {
    removeImage (id) {
      this.images = this.images.filter(image => image.id !== id)
      this.$toast.info('Image was deleted successfully')
    },
    showImages (images) {
      this.dialog = false
      this.images = images
    },
    getOffset (el) {
      const rect = el.getBoundingClientRect()
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      }
    }
  }
}
</script>
<style scoped lang="scss">
.masonry__scrollable {
  overflow-y: scroll;
}
</style>
