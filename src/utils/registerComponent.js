import Vue from 'vue'

const requireComponent = require.context('../views/param', true, /\w+\/$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.split('/')[1]
  Vue.component(componentName, componentConfig.default || componentConfig)
})
