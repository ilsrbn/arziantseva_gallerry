<template>
  <ScrollableLayout>
    <template #header>
      <v-sheet rounded="xl" class="pa-2">
        <v-row>
          <v-col cols="12" md="4">
            <v-dialog width="500">
              <template #activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  rounded
                  color="green"
                  elevation="5"
                  v-on="on"
                >
                  Create Category <v-icon right>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </template>
              <v-card :disabled="loading" :loading="loading">
                <v-card-title>Create category</v-card-title>
                <v-card-subtitle>Enter category title</v-card-subtitle>
                <v-card-text>
                  <v-form v-model="category.valid">
                    <v-text-field
                      v-model="category.title"
                      required
                      :rules="category.rules"
                      outlined
                      placeholder="Category title"
                      validate-on-blur
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn :loading="loading" :disabled="loading" rounded color="green" @click="createCategory()">
                    Create Category <v-icon right>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="4">
            <v-text-field
              v-model="items.search"
              hide-details
              dense
              outlined
              rounded
              label="Search"
            />
          </v-col>
        </v-row>
      </v-sheet>
    </template>
    <template #default>
      <v-data-table
        :loading="items.loading"
        :items="items.list"
        multi-sort
        :headers="items.headers"
        :search="items.search"
      >
        <!--        <template #[`item.brief_content`]="{ item }">-->
        <!--          <template v-if="!!item.brief_content">-->
        <!--            {{ item.brief_content }}-->
        <!--          </template>-->
        <!--          <template v-else>-->
        <!--            <v-chip outlined>-->
        <!--              Empty-->
        <!--            </v-chip>-->
        <!--          </template>-->
        <!--        </template>-->
        <template #[`item.created_at`]="{ item }">
          <!--          {{ formatDate(item.created_at) }}-->
          {{ formatDate($moment.utc(item.created_at).local()) }}
        </template>
        <template #[`item.updated_at`]="{ item }">
          {{ formatDate($moment.utc(item.updated_at).local()) }}
        </template>
        <template #[`item.is_published`]="{ item }">
          <template v-if="item.is_published.toString() === '1'">
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-chip v-bind="attrs" color="primary" @click="switchStatus(item.id)" v-on="on">
                  Posted
                </v-chip>
              </template>
              <span>Click to hide category</span>
            </v-tooltip>
          </template>
          <template v-else>
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-chip v-bind="attrs" outlined @click="switchStatus(item.id)" v-on="on">
                  Hidden
                </v-chip>
              </template>
              <span>Click to post category</span>
            </v-tooltip>
          </template>
        </template>
        <template #[`item.attach_counter`]="{ item }">
          <v-chip :outlined="!!!item.attach_counter" :color="!!item.attach_counter ? 'primary' : 'default'">
            {{ item.attach_counter }}
          </v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-menu v-if="item.title !== 'Uncategorized'" left offset-x close-on-content-click transition="slide-x-transition">
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" color="deep-orange" class="mr-2" v-on="on">
                <v-icon>mdi-delete</v-icon>Delete
              </v-btn>
            </template>
            <v-card color="red darken-4" dark shaped outlined elevation="10">
              <v-card-title>Delete</v-card-title>
              <v-card-subtitle>
                Are you sure?
                <br>
                This action can't be undone
              </v-card-subtitle>
              <v-card-actions>
                <v-btn icon>
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn icon color="primary" @click="deleteItem(item.id)">
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-btn color="info" @click="viewItem(item.id)">
            <v-icon left>
              mdi-pencil
            </v-icon>Edit
          </v-btn>
        </template>
      </v-data-table>
    </template>
  </ScrollableLayout>
</template>

<script>
import ScrollableLayout from '@/components/admin/ScrollableLayout'
import formatDate from '@/utlis/format-date'
// import { CONTENT } from '@/utlis/Content'
// const content = CONTENT.GALLERY
export default {
  name: 'DashboardGallery',
  components: { ScrollableLayout },
  layout: 'dashboard',
  data: () => ({
    loading: true,
    category: {
      valid: false,
      title: '',
      rules: [
        v => !!v || 'Title is required',
        v => v.length >= 4 || 'Title must be at least 4 characters'
      ]
    },
    items: {
      search: null,
      list: [],
      loading: true,
      headers: [
        {
          text: 'Status',
          value: 'is_published'
        },
        {
          text: 'Title',
          value: 'title'
        },
        // {
        //   text: 'Short description',
        //   value: 'brief_content'
        // },
        {
          text: 'Photos',
          value: 'attach_counter'
        },
        {
          text: 'Created',
          value: 'created_at'
        },
        {
          text: 'Last update',
          value: 'updated_at'
        },
        {
          value: 'actions',
          align: 'right'
        }
      ]
    }
  }),
  async created () {
    try {
      await this.fetchItems()
    } catch (e) {
      this.$toast.error(e)
      console.log(e)
    } finally {
      this.items.loading = false
      this.loading = false
    }
  },
  methods: {
    formatDate,
    async createCategory () {
      if (!this.category.valid) {
        this.$toast.error('Form is invalid')
        return false
      }
      this.loading = true
      try {
        const payload = {
          title: this.category.title,
          brief_content: '',
          raw_content: '',
          is_published: 0,
          post_id: 2
        }
        const resp = await this.$axios.$post('/admin/blog/items', payload)
        this.$router.push(`/admin/gallery/${resp.id}`)
        this.$toast.success('Category created')
      } catch (e) {
        console.log(e)
        this.$toast.error(e.message)
      } finally {
        this.loading = false
      }
    },
    async switchStatus (id) {
      this.items.loading = true
      try {
        await this.$axios.$get(`/admin/blog/items/${id}/change-publish`)
        await this.fetchItems()
        this.$toast.info('Status changed')
      } catch (e) {
        console.log(e)
        this.$toast.error(e.message)
      } finally {
        this.items.loading = false
      }
    },
    async fetchItems () {
      const { data } = await this.$axios.$get('/admin/blog/items?post_id=2')
      console.log(data)
      this.items.list = data
    },
    viewItem (index) {
      this.$router.push('/admin/gallery/' + index)
    },
    async deleteItem (index) {
      this.items.loading = true
      try {
        await this.$axios.$delete('/admin/blog/items/' + index)
        const { data } = await this.$axios.$get('/admin/blog/items')
        this.items.list = data

        this.$toast.show('Category deleted')
      } catch (e) {
        console.log(e)
        this.$toast.error(e.message)
      } finally {
        this.items.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
