export default {
  template: `
    <div class="field">
      <label class="label">{{ label }}</label>
      <div class="control">
        <input class="input" type="text" :value="selected" @change="onChange" />
      </div>
    </div>`,
  props: {
    type: String,
    label: String,
    selected: String | Number
  },
  methods: {
    onChange(ev) {
      this.$emit("change-value", ev.target.value);
    }
  }
}
