// 发布订阅模式
class EventEmitter{
  constructor() {
    this.subs = new Map()
  }
  addListener(type, fn) {
    const handler = this.subs.get(type)
    if (!handler) {
      this.subs.set(type, [fn])
    } else {
      handler.push(fn)
    }
  }
  emit(type) {
    const handler = this.subs.get(type)
    if (!handler) return
    handler.forEach(fn => {
      fn()
    })
  }
  removeListener(type, fn) {
    let handler = this.subs.get(type)
    if (!handler) return
    handler = handler.filter(item => item !== fn)
    this.subs.set(type, handler)
  }
  removeAllListener(type) {
    let handler = this.subs.get(type)
    if (!handler) return
    this.subs.delete(type)
  }
}

const e = new EventEmitter()
function fn() {
  console.log('fn')
}

console.log('-------')
e.addListener('type1', () => {
  console.log('emit event 1')
})
e.emit('type1') 

console.log('-------')
e.addListener('type1', fn)
e.emit('type1')

console.log('-------')
e.removeListener('type1', fn)
e.emit('type1')
