<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title>
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
              validate-on-blur
              :rules="titleRules"
              outlined
              dense
              label="Category title"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea v-model="content.raw_content" label="Category description" outlined rows="3" />
          </v-col>
          <v-col><v-textarea v-model="content.brief_content" label="Category short description" outlined rows="3" /></v-col>
        </v-row>
      </v-form>
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
export default {
  name: 'ViewGallery',
  layout: 'dashboard',
  data: () => ({
    loading: true,
    content: {
      title: '',
      raw_content: '',
      brief_content: '',
      sort: 0,
      is_published: false
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
      this.content = data
      this.content.is_published.toString() === '1' ? this.content.is_published = true : this.content.is_published = false
      delete this.content.updated_at
      delete this.content.created_at
      delete this.content.id
      delete this.content.attachments
      delete this.content.html_content
      delete this.content.deleted_at
    }).catch((e) => {
      console.log(e)
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
      try {
        const payload = this.content
        payload.is_published ? payload.is_published = 1 : payload.is_published = 0
        payload.post_id = 2
        await this.$axios.$post('/admin/blog/items/' + this.$route.params.id + '?_method=PUT', payload)

        this.$toast.success('Category created')
        this.$router.push('/admin/gallery')
      } catch (e) {
        console.log(e)
        this.$toast.error(e.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
