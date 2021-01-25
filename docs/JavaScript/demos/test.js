const TPromise = require('./promise.js')
const p = new TPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)
})

p
.then(res => {
  console.log(res, 'then1')
  return '200'
})
.then(res => {
  console.log(res, 'then2')
  return new TPromise((resolve, reject) => {
    console.log('other')
    return 'test'
  })
})
.then(res => {console.log(res)})
console.log('start')