<template>
  <v-card :loading="loading" :disabled="loading" class="card__scrollable">
    <v-card-title>Upload photos</v-card-title>
    <v-card-text v-if="!!images.length">
      <v-container>
        <v-row>
          <v-col>
            <masonry
              :cols="{
                default: 3
              }"
              :gutter="{ default: 12 }"
            >
              <div v-for="(image, i) in images" :key="i" :style="{ marginBottom: '12px' }">
                <v-img :src="image.url" />
              </div>
            </masonry>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col :cols="!!images.length ? '10' : '12'">
          <v-file-input
            v-model="files"
            :disabled="loading"
            accept="image/*"
            label="Images"
            multiple
            outlined
            chips
            @change="addPreloadedPhotos()"
          />
        </v-col>
        <v-col v-if="!!images.length" cols="2">
          <v-btn
            :loading="loading"
            :disabled="loading"
            block
            x-large
            color="primary"
            @click="upload()"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { v4 } from 'uuid'
export default {
  name: 'UploadImageModal',
  data: () => ({
    files: [],
    images: [],
    loading: false
  }),
  methods: {
    async upload () {
      this.loading = true
      try {
        for (let i = 0; i < this.files.length; i++) {
          // const file = this.files[i]
          await this.$axios.$post('/')
        }
        this.loading = false
        this.$toast.success('Images uploaded successfully!')
        this.images = []
        this.files = []
      } catch (e) {
        console.log(e)
        this.$toast.error('Oooops... Something went wrong')
      }
    },
    addPreloadedPhotos () {
      const files = this.files
      const images = []
      files.forEach((file) => {
        images.push({
          url: URL.createObjectURL(file),
          id: v4()
        })
      }
      )
      this.images = images
    }
  }
}
</script>

<style scoped>

</style>
