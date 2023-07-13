import { defineNuxtPlugin } from '#app'; // remove if 'vue3' is recognised and global by default

import {library, config} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
  faHospital as farHospital
} from '@fortawesome/free-regular-svg-icons'
import {
  faCircleUser as fasCircleUser,
  faBars as fasBars,
  faHospital as fasHospital,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import {faDiscord as fabDiscord} from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt not worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
  farHospital,
  fasHospital,
  fasBars,
  faPlus,
  fabDiscord
)

export default defineNuxtPlugin(({vueApp}) => {
  vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})