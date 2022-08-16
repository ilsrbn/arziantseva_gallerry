<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title>
      Create new category
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field v-model="content.title" outlined hide-details label="Category title" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea v-model="content.raw_content" label="Category description" outlined rows="3" />
        </v-col>
        <v-col><v-textarea v-model="content.brief_content" label="Category short description" outlined rows="3" /></v-col>
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
// import { CONTENT } from '@/utlis/Content'

export default {
  name: 'CreateCategory',
  layout: 'dashboard',
  data: () => ({
    // CONTENT,
    loading: false,
    content: {
      title: null,
      raw_content: null,
      brief_content: null,
      is_published: false,
      sort: 0
    }
  }),
  methods: {
    async create () {
      this.loading = true
      try {
        const payload = this.content
        payload.is_published ? payload.is_published = 1 : payload.is_published = 0
        payload.post_id = 2
        await this.$axios.$post('/admin/blog/items', payload)

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
