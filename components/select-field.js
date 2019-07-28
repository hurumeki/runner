export default {
  template: `
    <div class="field">
      <label class="label">{{ label }}</label>
      <div class="control">
        <div class="select">
          <select @change="onChangeSelect">
            <option
              v-for="opt in formmatedOptions"
              :value="opt.value"
              :selected="selected == opt.value">{{ opt.label }}</option>
          </select>
        </div>
      </div>
    </div>`,
  props: {
    type: String,
    label: String,
    options: Array,
    selected: String | Number
  },
  computed: {
    formmatedOptions() {
      let options = []
      if (Array.isArray(this.options)) {
        options = this.options.map(opt => {
          if (typeof opt == 'object') {
            return opt
          } else if (typeof opt == 'string') {
            return {
              label: opt,
              value: opt
            }
          } else {
            return {
              label: opt + '',
              value: opt
            }
          }
        })
      } else {
        if (this.type == 'boolean') {
          options.push({
            label: 'true',
            value: true,
          })
          options.push({
            label: 'false',
            value: false,
          })
        }
      }
      return options
    }
  },
  methods: {
    onChangeSelect(ev) {
      this.$emit("change-value", this.formmatedOptions[ev.target.selectedIndex].value);
    }
  }
}