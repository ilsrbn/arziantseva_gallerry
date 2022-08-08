<template>
  <div>
    <scrollable-layout>
      <template #header>
        <v-sheet class="pa-2" rounded="xl">
          <v-btn class="ml-auto" outlined rounded color="primary" @click.stop="handleCreatePost()">
            <v-icon left>
              mdi-upload
            </v-icon> NEW POST
          </v-btn>
        </v-sheet>
      </template>
      <template #default />
    </scrollable-layout>
  </div>
</template>

<script>
import ScrollableLayout from '@/components/admin/ScrollableLayout'
export default {
  name: 'AllPostsDashboardPage',
  components: {
    ScrollableLayout
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
