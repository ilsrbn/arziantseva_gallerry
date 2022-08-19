<template>
  <client-only>
    <div v-if="editor">
      <div class="editor__header">
        <div class="editor__header-group">
          <v-btn
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
          <v-menu v-model="hrefMenu.status" :close-on-content-click="false" :close-on-click="false" :position-x="hrefMenu.x" :position-y="hrefMenu.y">
            <v-card>
              <v-card-title>Add link</v-card-title>
              <v-card-text><v-text-field v-model="hrefMenu.link" label="link" placeholder="Paste link here" /></v-card-text>
              <v-card-actions>
                <v-btn icon color="primary" @click="setLink()">
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-btn
            icon
            outlined
            elevation="0"

            :color="editor.isActive('link') ? 'info' : 'grey'"
            @click="showMenu"
          >
            <i class="ri-link" />
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
  data: () => ({
    hrefMenu: {
      status: false,
      link: '',
      x: 0,
      y: 0
    },
    editor: null
  }),
  mounted () {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Image,
        Underline,
        Link
      ],
      content: '<h1>Adversarium dissentiunt ut his qui magnis vulputate tincidunt</h1> <p>Nisl recteque evertitur elit volutpat nobis. Delicata scelerisque id affert option neque verterem torquent odio mollis. Sanctus nunc enim erat ferri fames phasellus expetendis. Ultricies suscipit eam sapientem errem accusata.</p>'
    })
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    showMenu (e) {
      this.hrefMenu.link = ''
      if (this.editor.isActive('link')) {
        this.editor.chain().focus().toggleLink().run()
        return false
      }
      e.preventDefault()
      this.hrefMenu.status = false
      this.hrefMenu.x = e.clientX
      this.hrefMenu.y = e.clientY
      this.$nextTick(() => {
        this.hrefMenu.status = true
      })
    },
    setLink () {
      this.editor.chain().focus().toggleLink({ href: this.hrefMenu.link, target: '_blank' }).run()
      this.hrefMenu.status = false
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
