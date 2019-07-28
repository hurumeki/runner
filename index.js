import { run } from "./lib/functions.js";
import {
  TEST_CASE_DEFAULT,
  LANGUAGES,
  SYNTAX_MODES,
  THEMES,
  KEYBOARDS,
  EDITOR_OPTION_RULES,
  COMMANDS,
  TABS
} from "./lib/const.js";

import SAMPLE_CODES from "./lib/sample-codes.js";

import Editor from "./components/editor.js";
import LicensesModalContent from "./components/licenses-modal-content.js";
import Modal from "./components/modal.js";
import MyHeader from "./components/my-header.js";
import ShortcutsModalContent from "./components/shortcuts-modal-content.js";
import SelectField from "./components/select-field.js";
import TextField from "./components/text-field.js";
import TestForm from "./components/test-form.js";

let hasParam = false;

let query = location.search.slice(1);
let queryArr = query.split("&");

let params = {};
if (query.length > 0) {
  hasParam = true;
  queryArr.forEach(param => {
    let p = param.split("=");
    if (/\[\]$/.test(p[0])) {
      let key = p[0].replace("[]", "");
      if (!params[key]) {
        params[key] = [];
      }
      params[key].push(p[1]);
    } else {
      params[p[0]] = p[1];
    }
  });
}

let language = "c";
let theme = "monokai";
let keyboard = "";
let code = "";
let tests = [];
let editorOptionRules = [];
let editorOptions = {};
let testOptions = {
  inputNewline: true,
  expectedNewline: true
};

for (let key in EDITOR_OPTION_RULES) {
  let options;
  let defaultValue;
  let type;

  if (EDITOR_OPTION_RULES[key].selects) {
    options = EDITOR_OPTION_RULES[key].selects;
  }
  defaultValue = EDITOR_OPTION_RULES[key].default;
  type = EDITOR_OPTION_RULES[key].type;

  editorOptionRules.push({
    key,
    type,
    options
  });
  editorOptions[key] = defaultValue;
}

if (hasParam) {
  language = params["l"] || language;
  theme = params["t"] || theme;
  keyboard = params["k"] || keyboard;
  code = (params["c"] && decodeURIComponent(params["c"])) || "";
  if (params["i"] && Array.isArray(params["i"])) {
    params["i"].forEach((input, idx) => {
      if (!tests[idx]) {
        tests[idx] = Object.assign({}, TEST_CASE_DEFAULT);
      }
      tests[idx].input = decodeURIComponent(input);
    });
  }
  if (params["e"] && Array.isArray(params["e"])) {
    params["e"].forEach((expected, idx) => {
      if (!tests[idx]) {
        tests[idx] = Object.assign({}, TEST_CASE_DEFAULT);
      }
      tests[idx].expected = decodeURIComponent(expected);
    });
  }
} else {
  language = localStorage.getItem("language") || language;
  theme = localStorage.getItem("theme") || theme;
  keyboard = localStorage.getItem("keyboard") || keyboard;
  editorOptions = localStorage.getItem("editorOptions") || editorOptions;
  testOptions = localStorage.getItem("testOptions") || testOptions;
  code = localStorage.getItem("code") || SAMPLE_CODES[language] || "";
}

if (tests.length == 0) {
  tests.push(Object.assign({}, TEST_CASE_DEFAULT));
}

let activeCommands = {
  runAllTest: true,
  loadSampleCode: true,
  forcusRightTab: true,
  forcusLeftTab: true
};

let app = new Vue({
  el: "#app",
  template: `
    <div class="main">
      <my-header
        :active-tab-name="activeTabName"
        :test-count="tests.length"
        :success-count="successCount"
        :failed-count="failedCount"
        :running="running"
        @change-tab="onChangeTab"
        @click-menu="onClickMenu"></my-header>
      <div class="content">
        <section class="code" :class="{ 'is-block': activeTabName == 'code' }">
          <editor
            :code="code"
            :mode="mode"
            :theme="theme"
            :keyboard="keyboard"
            :commands="activeCommands"
            :options="editorOptions"
            @change-code="onChangeCode"
            @key-ctrl-alt-enter="onRunAll()"
            @key-ctrl-alt-h="onChangeTab('setting')"
            @key-ctrl-alt-l="onChangeTab('test')"
            @key-ctrl-alt-r="loadSampleCode()"
            ></editor>
        </section>
        <section class="section test" :class="{ 'is-block': activeTabName == 'test' }">
          <div class="box">
            <button class="button is-primary" @click="onRunAll()">
              <span class="icon">
                <i class="fas fa-forward"></i>
              </span>
              <span>Run All</span>
            </button>
            <button class="button is-danger" @click="onClearAll()">
              <span class="icon">
                <i class="fas fa-trash"></i>
              </span>
              <span>Clear All</span>
            </button>
          </div>

          <test-form v-for="test, index in tests"
            ref="test-forms"
            :key="index"
            :index="index"
            :input="test.input"
            :expected="test.expected"
            :output="test.output"
            :result="test.result"
            :running="test.running"
            @change-input="onChangeInput"
            @change-expected="onChangeExpected"
            @run-item="onRunItem"
            @clear-item="onClearItem"
            @delete-item="onDeleteTest"
            @key-ctrl-alt-h="onChangeTab('code')"
            @key-ctrl-alt-l="onChangeTab('setting')"></test-form>
          <button class="button mb100 is-secondary" @click="addTest">
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
            <span>Add</span>
          </button>
        </section>

        <section class="section setting" :class="{ 'is-block': activeTabName == 'setting' }">
          <h2 class="title">General</h2>
          <select-field
            label="Language"
            :options="languages"
            :selected="language"
            @change-value="changeLanguage"></select-field>

          <h2 class="title">Editor</h2>
          <select-field
            label="Theme"
            :options="themes"
            :selected="theme"
            @change-value="changeTheme"></select-field>
          <select-field
            label="KeyBinding"
            :options="keyboards"
            :selected="keyboard"
            @change-value="changeKeyboard"></select-field>
          <component v-for="eo of editorOptionRules"
            :is="(eo.type == 'number' || eo.type == 'string') ? 'text-field' : 'select-field' "
            :key="eo.key"
            :label="eo.key"
            :type="eo.type"
            :options="eo.options"
            :selected="editorOptions[eo.key]"
            @change-value="changeEditorOption(eo.key, $event)"></component>
          <h2 class="title">Test</h2>
          <select-field
            label="Add a newline at the end of 'input' if not"
            :options="[{ label: 'true', value: true } , { label: 'false', value: false }]"
            :selected="testOptions['inputNewline']"
            @change-value="changeTestOption('inputNewline', $event)"></select-field>
          <select-field
            label="Add a newline at the end of 'expected' if not"
            :options="[{ label: 'true', value: true } , { label: 'false', value: false }]"
            :selected="testOptions['expectedNewline']"
            @change-value="changeTestOption('expectedNewline', $event)"></select-field>
        </section>
      </div>
      <modal :class="{ 'is-active': isActiveShortcutModal }"
        @click-close="closeShortcutModal">
        <span slot="title">Keyboard Shortcuts</span>
        <shortcuts-modal-content slot="content"></shortcuts-modal-content>
      </modal>
      <modal :class="{ 'is-active': isActiveLicenseModal }"
        @click-close="closeLicenseModal">
        <span slot="title">Third party licenses</span>
        <licenses-modal-content slot="content"></licenses-modal-content>
      </modal>
    </div>
  `,
  components: {
    "my-header": MyHeader,
    editor: Editor,
    "test-form": TestForm,
    "select-field": SelectField,
    "text-field": TextField,
    modal: Modal,
    "shortcuts-modal-content": ShortcutsModalContent,
    "licenses-modal-content": LicensesModalContent
  },
  data() {
    return {
      code: code,
      language: language,
      theme: theme,
      keyboard: keyboard,
      activeTabName: "code",
      tests: tests,
      languages: LANGUAGES,
      themes: THEMES,
      keyboards: KEYBOARDS,
      useSave: !hasParam,
      isActiveShortcutModal: false,
      isActiveLicenseModal: false,
      editorOptionRules,
      editorOptions,
      testOptions
    };
  },
  computed: {
    mode() {
      return SYNTAX_MODES[this.language];
    },
    successCount() {
      return this.tests.filter(t => t.result).length;
    },
    failedCount() {
      return this.tests.filter(t => t.result === false).length;
    },
    running() {
      return this.tests.some(t => t.running);
    },
    activeCommands() {
      return COMMANDS.filter(command => {
        return activeCommands[command.name];
      });
    }
  },
  mounted() {},
  methods: {
    onChangeTab(tabName) {
      this.activeTabName = tabName;
    },
    onChangeCode(code) {
      this.code = code;
      if (this.useSave) {
        this.saveCode()
      }
    },
    onChangeInput(index, input) {
      this.tests[index].input = input;
    },
    onChangeExpected(index, expected) {
      this.tests[index].expected = expected;
    },
    addTest(data = {}) {
      if (!Array.isArray(data)) {
        data = [data];
      }
      data.forEach(d => {
        let test = Object.assign({}, TEST_CASE_DEFAULT);
        if (d.input != undefined) {
          test.input = d.input;
        }
        if (d.expected != undefined) {
          test.expected = d.expected;
        }
        if (d.output != undefined) {
          test.output = d.output;
        }
        this.tests.push(test);
      });
      this.$nextTick(() => {
        this.$refs["test-forms"][
          this.$refs["test-forms"].length - 1
        ].$refs.input.focus();
      });
    },
    onRunItem(index) {
      let input = this.tests[index].input
      let expected = this.tests[index].expected

      this.tests[index].running = true;
      this.tests[index].result = undefined;

      if (input != "" && this.testOptions["inputNewline"]) {
        if (!/\n$/.test(input)) {
          input += "\n";
        }
      }
      if (expected != "" && this.testOptions["expectedNewline"]) {
        if (!/\n$/.test(expected)) {
          expected += "\n";
        }
      }
      return run(this.code, this.language, input)
        .then(data => {
          if (data.stderr) {
            this.tests[index].output = data.stderr;
            this.tests[index].result = false;
            throw new Error("stderr exists");
          }
          this.tests[index].output = data.stdout;
          if (expected != '') {
            this.tests[index].result = expected == data.stdout;
          }
          this.tests[index].running = false;
        })
        .catch(error => {
          this.tests[index].running = false;
          console.error(error);
        });
    },
    onClearItem(index) {
      this.$set(this.tests, index, Object.assign({}, TEST_CASE_DEFAULT));
    },
    onDeleteTest(index) {
      this.tests.splice(index, 1);
    },
    onRunAll() {
      Promise.all(
        this.tests.map((test, index) => {
          return this.onRunItem(index, test.input, test.expected);
        })
      );
    },
    onClearAll() {
      if (window.confirm("Are you sure you want to clear all?")) {
        this.tests.forEach((_, index) => {
          this.onClearItem(index);
        });
        this.tests = [];
        this.addTest();
      }
    },
    changeLanguage(newVal) {
      this.language = newVal;
      if (this.useSave) {
        localStorage.setItem("language", this.language);
      }
    },
    changeTheme(newVal) {
      this.theme = newVal;
      if (this.useSave) {
        localStorage.setItem("theme", this.theme);
      }
    },
    changeKeyboard(newVal) {
      this.keyboard = newVal;
      if (this.useSave) {
        localStorage.setItem("keyboard", this.keyboard);
      }
    },
    changeEditorOption(key, selected) {
      this.editorOptions = Object.assign({}, this.editorOptions, {
        [key]: selected
      });
    },
    changeTestOption(key, selected) {
      this.testOptions = Object.assign({}, this.testOptions, {
        [key]: selected
      });
    },
    loadSampleCode() {
      let code = SAMPLE_CODES[this.language];
      if (code) {
        if (
          window.confirm(
            `Are you sure you want to load ${this.language} sample code?`
          )
        ) {
          this.code = code;
        }
      } else {
        alert(`Sorry. ${this.language} sample dose not exist.`);
      }
    },
    onClickMenu(menu) {
      if (menu == "shortcuts") {
        this.isActiveShortcutModal = true;
      } else if (menu == "licenses") {
        this.isActiveLicenseModal = true;
      }
    },
    saveCode: _.debounce(function() {
      localStorage.setItem("code", this.code);
    }, 5000),
    closeShortcutModal() {
      this.isActiveShortcutModal = false;
    },
    closeLicenseModal() {
      this.isActiveLicenseModal = false;
    }
  }
});

hotkeys("ctrl+alt+l,ctrl+alt+h,ctrl+alt+enter", function(event, handler) {
  let idx;
  switch (handler.key) {
    case "ctrl+alt+h":
      idx = TABS.indexOf(app.activeTabName);
      if (idx == 0) {
        idx = TABS.length - 1;
      } else {
        idx -= 1;
      }
      app.onChangeTab(TABS[idx]);
      break;
    case "ctrl+alt+l":
      idx = TABS.indexOf(app.activeTabName);
      if (idx == TABS.length - 1) {
        idx = 0;
      } else {
        idx += 1;
      }
      app.onChangeTab(TABS[idx]);
      break;
    case "ctrl+alt+enter":
      app.onRunAll();
      break;
  }
});
