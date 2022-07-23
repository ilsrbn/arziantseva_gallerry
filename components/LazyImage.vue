<template>
  <v-img
    :src="`https://picsum.photos/1000/600?image=${getRandomInt(1, 100)}`"
    :lazy-src="`https://picsum.photos/10/6?image=${getRandomInt(1, 100)}`"
    :aspect-ratio="getRandomArbitrary(1, 3)"
    class="grey lighten-2"
    @click="overlay = !overlay"
  >
    <v-overlay absolute :value="overlay">
      <v-btn color="red">
        <span class="mr-1">Delete</span>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-overlay>
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
</template>

<script>
export default {
  name: 'LazyImage',
  data: () => ({
    overlay: false
  }),
  methods: {
    getRandomArbitrary (min, max) {
      return Math.random() * (max - min) + min
    },
    getRandomInt (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }
}
</script>
