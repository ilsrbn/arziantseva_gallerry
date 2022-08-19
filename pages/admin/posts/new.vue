<template>
  <v-card>
    <v-card-title>
      Create blog post
    </v-card-title>
    <v-divider />
    <v-card-text>
      <Editor></Editor>
    </v-card-text>
  </v-card>
</template>

<script>
// import { Editor, EditorContent } from '@tiptap/vue-2'
// import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image'
import Editor from '@/components/admin/Editor'
export default {
  name: 'NewPost',
  // components: { EditorContent },
  components: { Editor },
  layout: 'dashboard'
  // data: () => ({
  //   editor: null
  // }),
  // mounted () {
  //   this.editor = new Editor({
  //     extensions: [
  //       StarterKit,
  //       Image
  //     ],
  //     content: ''
  //   })
  // },
  // beforeDestroy () {
  //   this.editor.destroy()
  // }
}
</script>

<style scoped>

</style>
