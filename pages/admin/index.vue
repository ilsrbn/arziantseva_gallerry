<template>
  <div>
    <scrollable-layout>
      <template #header>
        <v-sheet rounded="xl" class="pa-2">
          <v-btn class="ml-auto" outlined rounded color="primary" @click.stop="dialog = true">
            <v-icon left>
              mdi-upload
            </v-icon> UPLOAD
          </v-btn>
        </v-sheet>
      </template>

      <template #default>
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
      </template>
    </scrollable-layout>

    <v-dialog v-model="dialog" max-width="1500">
      <UploadImageModal @showImages="showImages" />
    </v-dialog>
  </div>
</template>

<script>
import LazyImage from '~/components/admin/LazyImage'
import UploadImageModal from '~/components/admin/UploadImageModal'
import ScrollableLayout from '@/components/admin/ScrollableLayout'
export default {
  name: 'MainDashboardPage',
  components: {
    ScrollableLayout,
    UploadImageModal,
    LazyImage
  },
  layout: 'dashboard',
  data: () => ({
    dialog: false,
    loading: true,
    images: []
  }),

  methods: {
    removeImage (id) {
      this.images = this.images.filter(image => image.id !== id)
      this.$toast.info('Image was deleted successfully')
    },
    showImages (images) {
      this.dialog = false
      this.images = images
    }
  }
}
</script>
