import { run } from './lib/functions.js';
import { TEST_CASE_DEFAULT, LANGUAGES, THEMES, KEYBOARDS } from './lib/const.js'

import Editor from './components/editor.js';
import MyHeader from './components/my-header.js';
import SelectField from './components/select-field.js';
import TestForm from './components/test-form.js';

let app = new Vue({
  el: '#app',
  template: `
    <div>
      <my-header
        :active-tab-name="activeTabName"
        :test-count="tests.length"
        :success-count="successCount"
        :failed-count="failedCount"
        :running="running"
        @change-tab="onChangeTab"></my-header>
      <section class="code" :class="{ 'is-block': activeTabName == 'code' }">
        <editor :code="code" :mode="language" :theme="theme" :keyboard="keyboard" @change-code="onChangeCode"></editor>
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
          @delete-item="onDeleteTest"></test-form>

        <button class="button is-secondary" @click="addTest">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
          <span>Add</span>
        </button>
      </section>

      <section class="section setting" :class="{ 'is-block': activeTabName == 'setting' }">
        <select-field label="Language" :options="languages" :selected='language' @change-select="changeLanguage"></select-field>
        <select-field label="Theme" :options="themes" :selected='theme' @change-select="changeTheme"></select-field>
        <select-field label="KeyBinding" :options="keyboards" :selected='keyboard' @change-select="changeKeyboard"></select-field>
      </section>
    </div>
  `,
  components: {
    'my-header': MyHeader,
    editor: Editor,
    'test-form': TestForm,
    'select-field': SelectField
  },
  data: {
    code: `function Main(input) {
  console.log(input)
}
Main(require("fs").readFileSync("/dev/stdin", "utf8"));
    `,
    language: 'javascript',
    theme: 'monokai',
    keyboard: '',
    activeTabName: 'code',
    tests: [],
    languages: LANGUAGES,
    themes: THEMES,
    keyboards: KEYBOARDS
  },
  computed: {
    successCount() {
      return this.tests.filter((t) => t.result).length
    },
    failedCount() {
      return this.tests.filter((t) => t.result === false).length
    },
    running() {
      return this.tests.some((t) => t.running)
    }
  },
  mounted() {
    this.addTest({
      input: '1',
      expected: '2'
    })
  },
  methods: {
    onChangeTab(tabName) {
      this.activeTabName = tabName
    },
    onChangeCode(code) {
      this.code = code
    },
    onChangeInput(index, input) {
      this.tests[index].input = input
    },
    onChangeExpected(index, expected) {
      this.tests[index].expected = expected
    },
    addTest(data = {}) {
      if (!Array.isArray(data)) {
        data = [data]
      }
      data.forEach((d) => {
        let test = Object.assign({}, TEST_CASE_DEFAULT);
        if (d.input != undefined) {
          test.input = d.input
        }
        if (d.expected != undefined) {
          test.expected = d.expected
        }
        if (d.output != undefined) {
          test.output = d.output
        }
        this.tests.push(test)
      })
    },
    onRunItem(index, input, expected) {
      this.tests[index].running = true
      this.tests[index].result = undefined
      return run(this.code, this.language, input)
        .then((data) => {
          console.log(data)
          if (data.stderr) {
            this.tests[index].output = data.stderr
            this.tests[index].result = false
            throw new Error('stderr exists')
          }
          this.tests[index].output = data.stdout
          if (expected != undefined) {
            this.tests[index].result = expected == data.stdout
          }
          this.tests[index].running = false
        })
        .catch((error) => {
          this.tests[index].running = false
          console.error(error)
        })
    },
    onClearItem(index) {
      this.$set(this.tests, index, Object.assign({}, TEST_CASE_DEFAULT));
    },
    onDeleteTest(index) {
      this.tests.splice(index, 1)
    },
    onRunAll() {
      Promise.all(this.tests.map((test, index) => {
        return this.onRunItem(index, test.input, test.expected)
      }))
    },
    onClearAll() {
      this.tests.forEach((_, index) => {
        this.onClearItem(index)
      })
    },
    changeLanguage(newVal) {
      this.language = newVal
    },
    changeTheme(newVal) {
      this.theme = newVal
    },
    changeKeyboard(newVal) {
      this.keyboard = newVal
    }
  }
})