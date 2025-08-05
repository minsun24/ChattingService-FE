import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const customTheme = {
    dark: false,
    colors: {
        'orange-main': '#FF852F',
        'orange-light': '#FFA94D',
        'orange-dark': '#CC6200',
        'bg-light': '#FFF7EF',
        'text-primary': '#2E2E2E',
        'text-muted': '#777777',
    }
}


export default createVuetify({
  theme: {
    defaultTheme: 'customTheme', // 이 이름이 아래 키와 일치해야 함!
    themes: {
      customTheme: customTheme // key 이름이 'customTheme'여야 함
    }
  },
  components,
  directives 
})