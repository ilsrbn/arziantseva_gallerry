<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title>
      <v-btn icon class="mr-2" @click="$router.go(-1)">
        <i class="ri-arrow-left-line ri-2x" />
      </v-btn>
      View/Edit category
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-form v-model="valid">
        <v-row>
          <v-col>
            <v-text-field
              v-model="content.title"
              required
              :rules="titleRules"
              outlined
              dense
              label="Category title"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <AdminEditor class="editor-preview" v-model="content.raw_content" />
          </v-col>
        </v-row>
        <v-row>
          <v-col><v-card><v-card-text><div class="editor-preview" v-html="content.raw_content" /></v-card-text></v-card></v-col>
        </v-row>
        <!--        <v-row>-->
        <!--          <v-col>-->
        <!--            <v-textarea v-model="content.raw_content" label="Category description" outlined rows="3" />-->
        <!--          </v-col>-->
        <!--          <v-col><v-textarea v-model="content.brief_content" label="Category short description" outlined rows="3" /></v-col>-->
        <!--        </v-row>-->
      </v-form>
      <v-row>
        <v-col>
          <v-file-input
            v-model="images.files"
            :disabled="loading"
            accept="image/*"
            label="It's recommended to upload photos not more then 2.0 MB size."
            multiple
            outlined
            chips
            @change="addPreloadedPhotos()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <masonry
            :cols="{
              default: 3
            }"
            :gutter="{ default: 12 }"
          >
            <div v-for="(image, i) in images.list" :key="i" :style="{ marginBottom: '12px' }">
              <LazyImage :image="image" @removeImage="removeImage" />
            </div>
          </masonry>
        </v-col>
      </v-row>
    </v-card-text>

    <v-row><v-col><v-divider /></v-col></v-row>
    <v-card-actions>
      <v-checkbox v-model="content.is_published" label="Published" />

      <v-spacer />

      <v-btn
        :loading="loading"
        rounded
        :disabled="loading"
        large
        color="primary"
        @click="create()"
      >
        <span>
          Submit</span> <v-icon right>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { v4 } from 'uuid'

export default {
  name: 'DashboardPost',
  layout: 'dashboard',
  data: () => ({
    images: {
      list: [],
      files: [],
      toUpload: [],
      toRemove: []
    },
    loading: true,
    content: {
      title: '',
      raw_content: '',
      brief_content: '',
      sort: 0,
      is_published: false,
      html_content: ''
    },
    titleRules: [
      v => !!v || 'Title is required',
      v => v.length >= 4 || 'Title must be at least 4 characters'
    ],
    valid: false
  }),
  created () {
    // const { data } = await this.$axios.$get('/admin/blog/item-attachments?blog_item_id=' + this.$route.params.id)
    this.$axios.$get('/admin/blog/items/' + this.$route.params.id).then((data) => {
      this.content.title = data.title
      this.content.sort = data.sort
      this.content.is_published = data.is_published.toString() === '1' ? this.content.is_published = true : this.content.is_published = false
      this.content.brief_content = data.brief_content || ''
      this.content.raw_content = data.raw_content || ''
      this.content.html_content = data.html_content || ''
      this.images.list = [...data.attachments]
    }).catch((e) => {
      const error = e.response
      if (error.status === 404) {
        this.$router.push('/admin/gallery')
        this.$toast.error('Category not found')
        return
      }
      console.log(e.response)
      this.$toast.error(e.message)
    }).finally(() => {
      this.loading = false
    })
  },
  methods: {
    async create () {
      if (!this.valid) {
        this.$toast.error('Form is invalid')
        return false
      }
      this.loading = true
      for (const img of this.images.toRemove) {
        await this.deleteImage(img.id)
      }
      for (const img of this.images.toUpload) {
        await this.handleUpload(img)
      }
      try {
        const payload = this.content
        payload.is_published ? payload.is_published = 1 : payload.is_published = 0
        payload.post_id = 1
        await this.$axios.$post('/admin/blog/items/' + this.$route.params.id + '?_method=PUT', payload)

        this.$toast.success('Category updated!')
        await this.$router.push('/admin/posts')
      } catch (e) {
        console.log(e)
        this.$toast.error(e.message)
      } finally {
        this.loading = false
      }
    },
    async handleUpload (img) {
      try {
        const formData = new FormData()
        formData.append('blog_item_id', this.$route.params.id)
        formData.append('source', 'FILE')
        formData.append('file_path', img.file)
        await this.$axios.$post('/admin/blog/item-attachments', formData)
        this.$toast.success('Image uploaded')
      } catch (e) {
        console.log(e)
        this.$toast.error(e)
      }
    },
    addPreloadedPhotos () {
      const files = this.images.files
      const images = []
      files.forEach((file) => {
        images.push({
          file,
          url: URL.createObjectURL(file),
          id: v4()
        })
      }
      )
      this.images.files = []
      this.images.list = [...this.images.list, ...images]
      this.images.toUpload = [...this.images.toUpload, ...images]
    },
    removeImage (id) {
      const img = this.images.list.find(el => el.id === id)
      this.images.list = this.images.list.filter(el => el.id !== id)
      this.images.toUpload = this.images.toUpload.filter(el => el.id !== id)
      'file_path' in img && this.images.toRemove.push(img)
    },
    async deleteImage (id) {
      const img = this.images.list.find(el => el.id === id)
      if (img && !('file_path' in img)) {
        this.$toast.info('Image deleted successfully')
        this.images.list = this.images.list.filter(el => el.id !== id)
        this.loading = false
        return
      }
      try {
        await this.$axios.$delete(`/admin/blog/item-attachments/${id}`)
        this.$toast.info('Image deleted successfully')
        this.images.list = this.images.list.filter(el => el.id !== id)
      } catch (e) {
        console.log(e)
        this.$toast.error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
