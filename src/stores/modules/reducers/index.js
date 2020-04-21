const files = require.context('.', false, /\.js$/)
const reducers = {}

files.keys().forEach(function (fileName) {
  if (fileName === './index.js') return
  reducers[fileName.replace(/(\.\/|\.js)/g, '')] = files(fileName).default
})

export default reducers
