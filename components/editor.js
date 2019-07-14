export default {
    template: `
    <div class="editor-wrapper">
      <pre id="editor">{{ code }}</pre>
    </div>
    `,
    props: {
      code: String,
      theme: String,
      mode: String,
      keyboard: String,
    },
    data() {
      return {
        editor: null
      }
    },
    watch: {
      mode() {
        this.setMode()
      },
      theme() {
        this.setTheme()
      },
      keyboard() {
        this.setKeyboard()
      }
    },
    mounted() {
      this.editor = ace.edit("editor");
      this.editor.on('change', () => {
        this.beforeContent = this.editor.getValue()
        this.$emit('change-code', this.editor.getValue())
      })

      this.setMode()
      this.setTheme()
      this.setKeyboard()
    },
    methods: {
      setMode() {
        this.editor.session.setMode("ace/mode/" + this.mode)
      },
      setTheme() {
        this.editor.setTheme("ace/theme/" + this.theme);
      },
      setKeyboard() {
        if (this.keyboard) {
          this.editor.setKeyboardHandler("ace/keyboard/" + this.keyboard);
        } else {
          this.editor.setKeyboardHandler(null);
        }
      }
    }
  }