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
    options: Object,
    commands: Array
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
    },
    commands(newVal, oldVal) {
      this.setCommands(newVal, oldVal);
    },
  },
  mounted() {
    this.editor = ace.edit("editor");
    this.editor.setValue(this.code);

    this.editor.on("change", () => {
      this.beforeCode = this.editor.getValue();
      this.$emit("change-code", this.beforeCode);
    });

    this.editor.commands.addCommand({
      name: "showKeyboardShortcuts",
      bindKey: { win: "Ctrl-Alt-q", mac: "Command-Alt-q" },
      exec: function(editor) {
        ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
          module.init(editor);
          editor.showKeyboardShortcuts();
        });
      }
    });

    this.setMode();
    this.setTheme();
    this.setKeyboard();
    this.setOptions(this.options);
    this.setCommands(this.commands);
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
    },
    setCommands(newVal = [], oldVal = []) {
      oldVal.forEach((name) => {
        this.editor.commands.removeCommand(name)
      });
      newVal.forEach(({ name, bindKey, exec }) => {
        this.editor.commands.addCommand({ name, bindKey, exec: exec.bind(this) })
      });
    }
  }
}