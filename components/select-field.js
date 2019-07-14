export default {
  template: `
    <div class="field">
      <label class="label">{{ label }}</label>
      <div class="control">
        <div class="select">
          <select @change="onChangeSelect">
            <option v-for="opt in options" :value="opt.value" :selected="selected == opt.value">{{ opt.label }}</option>
          </select>
        </div>
      </div>
    </div>`,
  props: {
    label: String,
    options: Array,
    selected: String | Number
  },
  methods: {
    onChangeSelect(ev) {
      this.$emit("change-select", ev.target.value);
    }
  }
};
