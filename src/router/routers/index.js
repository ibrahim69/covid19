const files = require.context('.', false, /\.js$/)
const routers = []

files.keys().forEach(function (fileName) {
  if (fileName === './index.js') return
  routers.push(files(fileName).default)
})

export default routers
