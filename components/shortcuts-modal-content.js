export default {
  template: `<div class="content">
  <table class="table">
    <tbody>
      <tr v-for="s in shortcutsText['global']">
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
            key: 'Ctrl + Alt + 1',
            description: 'Show Code tab.'
          },
          {
            key: 'Ctrl + Alt + 2',
            description: 'Show Test tab.'
          },
          {
            key: 'Ctrl + Alt + 3',
            description: 'Show Setting tab.'
          },
          {
            key: 'Ctrl + Alt + l',
            description: 'Load sample code.'
          },
          {
            key: 'Alt + enter',
            description: 'Run the test case you are editing.'
          }
        ]
      }
    }
  }
}
