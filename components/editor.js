export default {
  template: `
    <div class="editor-wrapper">
      <pre id="editor"></pre>
    </div>
    `,
  props: {
    code: String,
    theme: String,
    mode: String,
    keyboard: String,
    options: Object
  },
  data() {
    return {
      editor: null,
      beforeCode: ''
    };
  },
  watch: {
    code(newVal) {
      if (this.beforeCode != newVal) {
        this.editor.setValue(newVal)
      }
    },
    mode() {
      this.setMode();
    },
    theme() {
      this.setTheme();
    },
    keyboard() {
      this.setKeyboard();
    },
    options() {
      this.setOptions()
    }
  },
  mounted() {
    this.editor = ace.edit("editor");
    this.editor.setValue(this.code);

    this.editor.on("change", () => {
      this.beforeCode = this.editor.getValue();
      this.$emit("change-code", this.beforeCode);
    });

    this.setMode();
    this.setTheme();
    this.setKeyboard();
    this.setOptions(this.options);
  },
  methods: {
    setMode() {
      this.editor.session.setMode("ace/mode/" + this.mode);
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
    },
    setOptions() {
      this.editor.setOptions(this.options)
    }
  }
}