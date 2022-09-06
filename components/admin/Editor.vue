<template>
  <client-only>
    <div v-if="editor">
      <div class="editor__header">
        <div class="editor__header-group">
          <v-btn
            rounded
            icon
            outlined
            elevation="0"

            :color="editor.isActive('heading', { level: 1 }) ? 'info' : 'grey'"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          >
            <i class="ri-h-1" />
          </v-btn>
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('heading', { level: 2 }) ? 'info' : 'grey'"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          >
            <i class="ri-h-2" />
          </v-btn>
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('heading', { level: 3 }) ? 'info' : 'grey'"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            <i class="ri-h-3" />
          </v-btn>
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('heading', { level: 4 }) ? 'info' : 'grey'"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          >
            <i class="ri-h-4" />
          </v-btn>
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('heading', { level: 5 }) ? 'info' : 'grey'"
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          >
            <i class="ri-h-5" />
          </v-btn>
        </div>
        <div class="editor__header-group">
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('paragraph') ? 'info' : 'grey'"
            @click="editor.chain().focus().setParagraph().run()"
          >
            <i class="ri-paragraph" />
          </v-btn>
        </div>
        <div class="editor__header-group">
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('bold') ? 'info' : 'grey'"
            @click="editor.chain().focus().toggleBold().run()"
          >
            <i class="ri-bold" />
          </v-btn>
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('italic') ? 'info' : 'grey'"
            @click="editor.chain().focus().toggleItalic().run()"
          >
            <i class="ri-italic" />
          </v-btn>
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('strike') ? 'info' : 'grey'"
            @click="editor.chain().focus().toggleStrike().run()"
          >
            <i class="ri-strikethrough" />
          </v-btn>
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('underline') ? 'info' : 'grey'"
            @click="editor.chain().focus().toggleUnderline().run()"
          >
            <i class="ri-underline" />
          </v-btn>
        </div>
        <div class="editor__header-group">
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('bulletList') ? 'info' : 'grey'"
            @click="editor.chain().focus().toggleBulletList().run()"
          >
            <i class="ri-list-unordered ri-xl" />
          </v-btn>
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('orderedList') ? 'info' : 'grey'"
            @click="editor.chain().focus().toggleOrderedList().run()"
          >
            <i class="ri-list-ordered ri-xl" />
          </v-btn>
        </div>
        <div class="editor__header-group">
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('link') ? 'info' : 'grey'"
            @click="setLink"
          >
            <i class="ri-link" />
          </v-btn>
          <v-btn
            v-if="editor.isActive('link')"
            icon
            outlined
            elevation="0"

            color="red"
            @click="editor.chain().focus().unsetLink().run()"
          >
            <i class="ri-link-unlink" />
          </v-btn>
        </div>
      </div>
      <v-sheet color="accent" class="pa-2" rounded>
        <editor-content :editor="editor" />
      </v-sheet>
    </div>
  </client-only>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
// eslint-disable-next-line import/no-named-as-default
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import 'remixicon/fonts/remixicon.css'
export default {
  name: 'PostEditor',
  components: { EditorContent },
  props: {
    value: {
      type: [String, null],
      required: true
    }
  },
  data: () => ({
    hrefMenu: {
      status: false,
      link: '',
      x: 0,
      y: 0
    },
    editor: null
  }),
  watch: {
    value (value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    }
  },
  mounted () {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Image,
        Underline,
        Link.configure({
          autolink: false,
          openOnClick: false
        })
      ],
      content: this.value,
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      }
    })
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    setLink () {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()

        return
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    }
  }
}
</script>

<style scoped lang="scss">
.editor__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba($color: white, $alpha: 0.2);
}

</style>
