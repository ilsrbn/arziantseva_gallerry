<template>
  <div :style="{ marginBottom: '20px' }" class="wrapper">
    <div class="overlay">
      <div class="overlay__container">
        <v-btn color="red" tile elevation="14" @click="handleRemove()">
          DELETE
          <v-icon right>
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-img
      :src="image.url"
      class="image grey lighten-2"
      @click="overlay = !overlay"
    >
      <template #placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          />
        </v-row>
      </template>
    </v-img>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          Are you sure you want to delete this photo?
        </v-card-title>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">
            No, I don't want to delete
          </v-btn>
          <v-btn color="primary" text @click="confirmDelete()">
            Yes, Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'LazyImage',
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    overlay: false,
    confirm: false,
    dialog: false
  }),
  methods: {
    confirmDelete () {
      this.dialog = false
      this.confirm = true
      this.handleRemove()
    },
    handleRemove () {
      if (!this.confirm) {
        this.dialog = true
        return
      }
      this.$emit('removeImage', this.image.id)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba($color: black, $alpha: 0.72);
    opacity: 0;
    transition: opacity .15s ease-in;
    &__container {
      display: flex;
      padding: 16px;
      height: 100%;
      justify-content: flex-end;
    }
  }
  &:hover {
    .overlay {
      opacity: 1;
      transition: opacity .15s ease-in;
    }
  }
  .image {
    z-index: 1;
  }
}
</style>
