const TEST_CASE_DEFAULT = {
  input: "",
  expected: "",
  output: "",
  result: undefined,
  running: false
};

const LANGUAGES = [
  { label: "c", value: "c" },
  { label: "cpp", value: "cpp" },
  { label: "objective-c", value: "objective-c" },
  { label: "java", value: "java" },
  { label: "kotlin", value: "kotlin" },
  { label: "scala", value: "scala" },
  { label: "swift", value: "swift" },
  { label: "csharp", value: "csharp" },
  { label: "go", value: "go" },
  { label: "haskell", value: "haskell" },
  { label: "erlang", value: "erlang" },
  { label: "perl", value: "perl" },
  { label: "python", value: "python" },
  { label: "python3", value: "python3" },
  { label: "ruby", value: "ruby" },
  { label: "php", value: "php" },
  { label: "bash", value: "bash" },
  { label: "r", value: "r" },
  { label: "javascript", value: "javascript" },
  { label: "coffeescript", value: "coffeescript" },
  { label: "vb", value: "vb" },
  { label: "cobol", value: "cobol" },
  { label: "fsharp", value: "fsharp" },
  { label: "d", value: "d" },
  { label: "clojure", value: "clojure" },
  { label: "elixir", value: "elixir" },
  { label: "mysql", value: "mysql" },
  { label: "rust", value: "rust" },
  { label: "scheme", value: "scheme" },
  { label: "commonlisp", value: "commonlisp" },
  { label: "plain", value: "plain" }
];

const SYNTAX_MODES = {
  c: "c_cpp",
  cpp: "c_cpp",
  "objective-c": "objectivec",
  java: "java",
  kotlin: "kotlin",
  scala: "scala",
  swift: "swift",
  csharp: "csharp",
  go: "golang",
  haskell: "haskell",
  erlang: "erlang",
  perl: "perl",
  python: "python",
  python3: "python",
  ruby: "ruby",
  php: "php",
  bash: "sh",
  r: "r",
  javascript: "javascript",
  coffeescript: "coffee",
  vb: "vbscript",
  cobol: "cobol",
  fsharp: "fsharp",
  d: "d",
  clojure: "clojure",
  elixir: "elixir",
  mysql: "mysql",
  rust: "rust",
  scheme: "scheme",
  commonlisp: "lisp",
  plain: "plain_text"
};

const THEMES = [
  { label: "ambiance", value: "ambiance" },
  { label: "chaos", value: "chaos" },
  { label: "chrome", value: "chrome" },
  { label: "clouds", value: "clouds" },
  { label: "clouds_midnight", value: "clouds_midnight" },
  { label: "cobalt", value: "cobalt" },
  { label: "crimson_editor", value: "crimson_editor" },
  { label: "dawn", value: "dawn" },
  { label: "dracula", value: "dracula" },
  { label: "dreamweaver", value: "dreamweaver" },
  { label: "eclipse", value: "eclipse" },
  { label: "github", value: "github" },
  { label: "gob", value: "gob" },
  { label: "gruvbox", value: "gruvbox" },
  { label: "idle_fingers", value: "idle_fingers" },
  { label: "iplastic", value: "iplastic" },
  { label: "katzenmilch", value: "katzenmilch" },
  { label: "kr_theme", value: "kr_theme" },
  { label: "kuroir", value: "kuroir" },
  { label: "merbivore", value: "merbivore" },
  { label: "merbivore_soft", value: "merbivore_soft" },
  { label: "mono_industrial", value: "mono_industrial" },
  { label: "monokai", value: "monokai" },
  { label: "pastel_on_dark", value: "pastel_on_dark" },
  { label: "solarized_dark", value: "solarized_dark" },
  { label: "solarized_light", value: "solarized_light" },
  { label: "sqlserver", value: "sqlserver" },
  { label: "terminal", value: "terminal" },
  { label: "textmate", value: "textmate" },
  { label: "tomorrow", value: "tomorrow" },
  { label: "tomorrow_night_blue", value: "tomorrow_night_blue" },
  { label: "tomorrow_night_bright", value: "tomorrow_night_bright" },
  { label: "tomorrow_night_eighties", value: "tomorrow_night_eighties" },
  { label: "tomorrow_night", value: "tomorrow_night" },
  { label: "twilight", value: "twilight" },
  { label: "vibrant_ink", value: "vibrant_ink" },
  { label: "xcode", value: "xcode" }
];

const KEYBOARDS = [
  { label: "-", value: "" },
  { label: "Emacs", value: "emacs" },
  { label: "Sublime", value: "sublime" },
  { label: "Vim", value: "vim" }
];

const EDITOR_OPTION_RULES = {
  selectionStyle: { type: 'array', selects: ["line", "text"], default: 'text' },
  highlightActiveLine: { type: 'boolean', default: true },
  highlightSelectedWord: { type: 'boolean', default: true },
  readOnly: { type: 'boolean', default: false },
  cursorStyle: { type: 'array', selects: ["ace", "slim", "smooth",　"wide"], default: 'ace' },
  mergeUndoDeltas: { type: 'array', selects: [false, true, "always"], default: true },
  behavioursEnabled: { type: 'boolean', default: true },
  wrapBehavioursEnabled: { type: 'boolean', default: true },
  // this is needed if editor is inside scrollable page
  autoScrollEditorIntoView: { type: 'boolean', default: false },
  // copy/cut the full line if selection is empty, defaults to false
  copyWithEmptySelection: { type: 'boolean', default: false },
  useSoftTabs: { type: 'boolean', default: true },
  navigateWithinSoftTabs: { type: 'boolean', default: false },
  enableMultiselect: { type: 'boolean', default: true },

  // renderer option
  hScrollBarAlwaysVisible: { type: 'boolean', default: false },
  vScrollBarAlwaysVisible: { type: 'boolean', default: false },
  highlightGutterLine: { type: 'boolean', default: true },
  animatedScroll: { type: 'boolean', default: false },
  showInvisibles: { type: 'boolean', default: false },
  showPrintMargin: { type: 'boolean', default: true },
  printMarginColumn: { type: 'number', default: 80 },
  fadeFoldWidgets: { type: 'boolean', default: false },
  showFoldWidgets: { type: 'boolean', default: true },
  showLineNumbers: { type: 'boolean', default: true },
  showGutter: { type: 'boolean', default: true },
  displayIndentGuides: { type: 'boolean', default: true },
  fontSize: { type: 'string', default: 12 },
  fontFamily: { type: 'string', default: '' },
  // resize editor based on the contents of the editor until the number of lines reaches maxLines
  maxLines: { type: 'number' },
  minLines: { type: 'number' },
  // number of page sizes to scroll after document end (typical values are 0, 0.5, and 1)
  scrollPastEnd: { type: 'number', default: 80, selects: [true, false] },
  fixedWidthGutter: { type: 'boolean', default: false },

  // mouse handler option
  scrollSpeed: { type: 'number', default: 2 },
  dragDelay: { type: 'number', default: 0 },
  dragEnabled: { type: 'boolean', default: true },
  focusTimout: { type: 'number', default: 0 },
  tooltipFollowsMouse: { type: 'boolean', default: true },

  // session options
  firstLineNumber: { type: 'number', default: 1 },
  overwrite: { type: 'boolean', default: false },
  newLineMode: { type: 'array', selects: ["auto", "unix", "windows"], default: 'auto' },
  useWorker: { type: 'boolean', default: true },
  useSoftTabs: { type: 'boolean', default: true },
  tabSize: { type: 'number', default: 4 },
  wrap: { type: 'number', selects: [true, false], default: false },
  foldStyle: { type: 'array', selects: ["markbegin", "markbeginend", "manual"], default: 'markbegin'}
}

const COMMANDS = [
  {
    name: "runAllTest",
    bindKey: { win: "Ctrl-Alt-enter", mac: "Command-Alt-enter" },
    exec: function() {
      this.$emit("key-ctrl-alt-enter");
    }
  },
  {
    name: "loadSampleCode",
    bindKey: { win: "Ctrl-Alt-r", mac: "Command-Alt-r" },
    exec: function() {
      this.$emit("key-ctrl-alt-r");
    }
  },
  {
    name: "forcusRightTab",
    bindKey: { win: "Ctrl-Alt-l", mac: "Command-Alt-l" },
    exec: function() {
      this.$emit("key-ctrl-alt-l");
    }
  },
  {
    name: "forcusLeftTab",
    bindKey: { win: "Ctrl-Alt-h", mac: "Command-Alt-h" },
    exec: function() {
      this.$emit("key-ctrl-alt-h");
    }
  }
];

let TABS = ["code", "test", "setting"];

export {
  TEST_CASE_DEFAULT,
  LANGUAGES,
  SYNTAX_MODES,
  THEMES,
  KEYBOARDS,
  EDITOR_OPTION_RULES,
  COMMANDS,
  TABS
};
