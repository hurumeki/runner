export default {
  template: `
    <div class="message is-small">
      <div class="message-header columns is-marginless">
        <div class="column is-paddingless">
          {{ index + 1 }}
        </div>
        <div class="">
          <button class="button is-primary is-small" @click="run">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>Run</span>
          </button>
          <button class="button is-danger is-small" @click="clear">
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
                  <textarea class="textarea" placeholder="input" v-model="inputText" @change="changeInput"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="message is-small is-info">
              <div class="control">
                <div class="message-body">
                    <textarea class="textarea" placeholder="expected" v-model="expectedText" @change="changeExpected"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="message is-small" :class="{ 'is-success': result, 'is-danger': !result }">
              <div class="message-body">
                <div class="control" :class="{ 'is-loading': running }">
                  <textarea class="textarea" placeholder="output" readonly v-model="output"></textarea>
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
      this.$emit("run-item", this.index, this.input, this.expected);
    },
    clear() {
      this.$emit("clear-item", this.index);
    },
    deleteItem() {
      this.$emit("delete-item", this.index);
    },
    changeInput(ev) {
      this.$emit("change-input", this.index, ev.target.value);
    },
    changeExpected(ev) {
      this.$emit("change-expected", this.index, ev.target.value);
    }
  }
};
