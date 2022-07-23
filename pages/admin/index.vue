<template>
  <v-row>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Filters
            </v-card-title>
            <v-card-actions>
              <v-btn color="primary" @click.stop="dialog = true">
                <span class="mr-1">Upload photos</span><v-icon>mdi-upload</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-col v-for="idx in 3" :key="idx" cols="12" sm="6" md="4">
      <v-row v-for="i in Math.ceil((Math.random() * 5))" :key="i">
        <v-col>
          <LazyImage />
        </v-col>
      </v-row>
    </v-col>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Upload photos</v-card-title>
        <v-card-text v-if="images">
          <v-container>
            <v-row>
              <v-col v-for="(img, id) in images" :key="id" cols="3">
                <v-img :src="img" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-file-input
            v-model="files"
            accept="image/*"
            label="Images"
            multiple
            chips
            @change="addPreloadedPhotos()"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import LazyImage from '@/components/LazyImage'
export default {
  name: 'MainDashboardPage',
  components: {
    LazyImage
  },
  layout: 'dashboard',
  data: () => ({
    dialog: false,
    files: [],
    images: []
  }),
  created () {
    console.log(4 % 3, 4 / 3)
    console.log(5 % 3, 5 / 3)
    console.log(6 % 3, 6 / 3)
  },
  methods: {
    addPreloadedPhotos () {
      const files = this.files
      const imgs = []
      files.forEach((file) => {
        imgs.push(URL.createObjectURL(file))
      })
      this.images = imgs
    }
  }
}
</script>
