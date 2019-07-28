export default {
  template: `
  <div class="modal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <slot name="title"></slot>
        </p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <slot name="content"></slot>
      </section>
    </div>
  </div>
  `,
  methods: {
    closeModal() {
      this.$emit('click-close')
    }
  }
}