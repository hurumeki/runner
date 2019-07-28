export default {
  template: `
    <div class="message is-small">
      <div class="message-header columns is-marginless">
        <div class="column is-paddingless">
          {{ index + 1 }}
        </div>
        <div class="">
          <button
            class="button is-primary is-small"
            @focus="(ev) => ev.target.classList.add('is-inverted')"
            @blur="(ev) => ev.target.classList.remove('is-inverted')"
            @click="run">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>Run</span>
          </button>
          <button
            class="button is-danger is-small"
            @focus="(ev) => ev.target.classList.add('is-inverted')"
            @blur="(ev) => ev.target.classList.remove('is-inverted')"
            @click="clear">
            <span class="icon">
              <i class="fas fa-eraser"></i>
            </span>
            <span>Clear</span>
          </button>
          <span>&NonBreakingSpace;</span>
        </div>
        <a class="delete" @click="deleteItem"></a>
      </div>
      <div class="message-body">
        <div class="columns">
          <div class="column">
            <div class="message is-small">
              <div class="message-body">
                <div class="control">
                  <textarea
                    ref="input"
                    class="textarea"
                    placeholder="input"
                    v-model="inputText"
                    @change="changeInput"
                    @keyup.ctrl.alt.enter.exact="run"
                    @keyup.ctrl.alt.h.exact="$emit('key-ctrl-alt-h')"
                    @keyup.ctrl.alt.l.exact="$emit('key-ctrl-alt-l')"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="message is-small is-info">
              <div class="control">
                <div class="message-body">
                  <textarea
                    ref="expected"
                    class="textarea"
                    placeholder="expected"
                    v-model="expectedText"
                    @change="changeExpected"
                    @keyup.ctrl.alt.enter.exact="run"
                    @keyup.ctrl.alt.h.exact="$emit('key-ctrl-alt-h')"
                    @keyup.ctrl.alt.l.exact="$emit('key-ctrl-alt-l')"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="message is-small" :class="{ 'is-success': result, 'is-danger': !result }">
              <div class="message-body">
                <div class="control" :class="{ 'is-loading': running }">
                  <textarea
                    ref="output"
                    class="textarea"
                    placeholder="output"
                    readonly
                    v-model="output"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
  props: {
    index: Number,
    input: String,
    expected: String,
    output: String,
    result: {
      type: Boolean,
      required: false,
      default: true
    },
    running: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    input(newVal) {
      this.inputText = newVal;
    },
    expected(newVal) {
      this.expectedText = newVal;
    }
  },
  data() {
    return {
      inputText: this.input,
      expectedText: this.expected
    };
  },
  methods: {
    run() {
      this.emitChangeInput(this.inputText)
      this.emitChangeExpected(this.expectedText)
      this.$emit("run-item", this.index, this.input, this.expected);
    },
    clear() {
      this.$emit("clear-item", this.index);
    },
    deleteItem() {
      this.$emit("delete-item", this.index);
    },
    changeInput(ev) {
      this.emitChangeInput(ev.target.value)
    },
    changeExpected(ev) {
      this.emitChangeExpected(ev.target.value)
    },
    emitChangeInput(value) {
      this.$emit("change-input", this.index, value);
    },
    emitChangeExpected(value) {
      this.$emit("change-expected", this.index, value);
    }
  }
}
