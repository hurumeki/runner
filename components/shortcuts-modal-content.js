export default {
  template: `<div class="content">
  <h3>Global</h3>
  <table class="table">
    <tbody>
      <tr v-for="s in shortcutsText['global']">
        <td>{{ s.key }}</td>
        <td>{{ s.description }}</td>
      </tr>
    </tbody>
  </table>
  <h3>In editor</h3>
  <table class="table">
    <tbody>
      <tr v-for="s in shortcutsText['editor']">
        <td>{{ s.key }}</td>
        <td>{{ s.description }}</td>
      </tr>
    </tbody>
  </table>
  <h3>In test</h3>
  <table class="table">
    <tbody>
      <tr v-for="s in shortcutsText['test']">
        <td>{{ s.key }}</td>
        <td>{{ s.description }}</td>
      </tr>
    </tbody>
  </table>
</div>`,
  data() {
    return {
      shortcutsText: {
        global: [
          {
            key: 'Ctrl + Alt + Enter',
            description: 'Run all test cases.'
          },
          {
            key: 'Ctrl + Alt + h',
            description: 'Go to left tab.'
          },
          {
            key: 'Ctrl + Alt + l',
            description: 'Go to right tab.'
          },
          {
            key: 'Ctrl + Alt + q',
            description: 'Show editor shortcuts.'
          }
        ],
        editor: [
          {
            key: 'Ctrl + Alt + r',
            description: 'Load sample code.'
          }
        ],
        test: [
          {
            key: 'Ctrl + Alt + enter',
            description: 'Run the test case you are editing.'
          }
        ]
      }
    }
  }
}
