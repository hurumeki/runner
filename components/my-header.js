export default {
  template: `
    <header>
      <nav class="navbar is-dark is-transparent" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item is-tab" :class="{ 'is-active': activeTabName == 'code' }" @click="changeTab('code')">
          <span class="icon is-medium">
            <i class="fas fa-code" aria-hidden="true"></i>
          </span>
          <span>Code</span>
        </a>
        <a class="navbar-item is-tab" :class="{ 'is-active': activeTabName == 'test' }" @click="changeTab('test')">
          <template v-if="running">
            <span class="icon is-medium">
              <i class="fas fa-spinner fa-pulse" aria-hidden="true"></i>
            </span>
          </template>
          <template v-else>
            <span v-if="failedCount == 0" class="icon is-medium" :class="{ 'has-text-success': testCount > 0 && successCount == testCount }">
              <i class="fas fa-check-circle" aria-hidden="true"></i>
            </span>
            <span v-if="failedCount > 0" class="icon is-medium has-text-danger">
              <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
            </span>
          </template>
          <span>Test ({{ successCount }}/{{ testCount }})</span>
        </a>
        <a class="navbar-item is-tab is-hidden-mobile" :class="{ 'is-active': activeTabName == 'setting' }" @click="changeTab('setting')">
          <span class="icon is-medium">
            <i class="fas fa-cog" aria-hidden="true"></i>
          </span>
          <span>Setting</span>
        </a>
        <a role="button"
          class="navbar-burger burger"
          :class="{ 'is-active': isActiveMenu }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="toggleMenu($event)">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': isActiveMenu }">
        <a class="navbar-item is-tab is-hidden-tablet" :class="{ 'is-active': activeTabName == 'setting' }" @click="changeTab('setting')">
          <span class="icon is-medium">
            <i class="fas fa-cog" aria-hidden="true"></i>
          </span>
          <span>Setting</span>
        </a>
        <div class="navbar-end" @mouseenter="toggleMenu($event, true)" @mouseleave="toggleMenu($event, false)">
          <div class="navbar-item has-dropdown" :class="{ 'is-active': isActiveMenu }">
            <a class="navbar-link" @click="toggleMenu($event)">
              More
            </a>

            <div class="navbar-dropdown is-right">
              <a class="navbar-item" @click="onClickMenu('shortcuts')">
                Shortcuts
              </a>
              <a class="navbar-item" href="https://github.com/hurumeki/runner" target="new">
                GitHub
              </a>
              <a class="navbar-item" href="https://twitter.com/hurumeki" target="new">
                Contact
              </a>
              <a class="navbar-item" href="https://github.com/hurumeki/runner/issues" target="new">
               Report an issue
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="onClickMenu('licenses')">
                Third party Licenses
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </header>
    `,
  props: {
    activeTabName: String,
    testCount: Number,
    successCount: Number,
    failedCount: Number,
    running: Boolean
  },
  data() {
    return {
      isActiveMenu: false
    };
  },
  methods: {
    changeTab(tabName) {
      this.isActiveMenu = false
      this.$emit("change-tab", tabName);
    },
    toggleMenu(ev, bool) {
      console.log(bool)
      this.isActiveMenu = bool !== undefined ? bool : !this.isActiveMenu;
    },
    onClickMenu(menu) {
      this.$emit('click-menu', menu)
    }
  }
}