<template>
  <ScrollableLayout>
    <template #header>
      <v-sheet rounded="xl" class="pa-2">
        <v-row>
          <v-col>
            <v-btn rounded color="primary">
              Create Category <v-icon right>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col>
            <v-text-field hide-details dense outlined rounded label="Search by name" />
          </v-col>
        </v-row>
      </v-sheet>
    </template>
    <template #default>
      <v-data-table
        :loading="items.loading"
        disable-filtering
        disable-pagination
        disable-sort
        :items="items.list"
        :headers="items.headers"
      >
        <template #[`item.brief_content`]="{ item }">
          <template v-if="!!item.brief_content">
            {{ item.brief_content }}
          </template>
          <template v-else>
            <v-chip outlined>
              Empty
            </v-chip>
          </template>
        </template>
        <template #[`item.created_at`]="{ item }">
          {{ formatDate($moment.utc(item.created_at).local()) }}
        </template>
        <template #[`item.updated_at`]="{ item }">
          {{ formatDate($moment.utc(item.updated_at).local()) }}
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
              mdi-eye
            </v-icon>View
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
    items: {
      list: [],
      loading: true,
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Short description',
          value: 'brief_content'
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
      const { data } = await this.$axios.$get('/admin/blog/items')
      this.mapResponse(data)
    } catch (e) {
      this.$toast.error('Error')
      console.log(e)
    } finally {
      this.loading = false
      this.items.loading = false
    }
  },
  methods: {
    formatDate,
    mapResponse (items) {
      const data = items
      const defaultItem = data.findIndex(el => el.title === 'default')
      data[defaultItem].title = 'Uncategorized'
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
        this.mapResponse(data)

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
