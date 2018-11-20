let desc = require('./a.js')
import './index.css'
// import './index.less'
console.log(desc.desc)
document.getElementById('app').innerHTML = desc.desc


if (module.hot) {
  module.hot.accept()
}