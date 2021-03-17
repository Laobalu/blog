// 客户端
function jsonp(url, params = {}, callbackName = '') {
  const generateURL = () => {
    let paramsStr = ''
    Reflect.ownKeys(params).forEach(key => {
      paramsStr += `${key}=${params[key]}&`
    })
    return `${url}?${paramsStr}callback=${callbackName}`
  }

  return new Promise((resolve, reject) => {
    callbackName = callbackName || Math.random().toString().replace('.', '')
    let scriptEle = document.createElement('script')
    scriptEle.src = generateURL()
    document.body.appendChild(scriptEle)
    window[callbackName] = data => {
      resolve(data)
      document.body.removeChild(scriptEle)
    }
  })
}

// 服务端express
let express = require('express')
let app = express()
app.get('/', function(req, res) {
  const callback = req.query.callback
  const sendData = '返回数据包'
  res.end(`${callback}(${sendData})`)
})

// 客户端调用
jsonp('http://localhost:3000', {a: 1}, 'jsonp')
.then(data => {
  console.log(data) // 返回数据包
})