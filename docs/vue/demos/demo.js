
function defineReactive(obj, key, val) {
  
  const pubSub = new PubSub()

  Object.defineProperty(obj, key, {
    configurable: true,
    get() {
      pubSub.add(PubSub.target)
      return val
    },
    set(newVal) {
      if(newVal === val) return
      pubSub.notify(newVal)
      val = newVal
      return newVal
    }
  })
}

function observe(data) {
  if(!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
}


// 事件中心
class PubSub {
  constructor() {
    this.subs = []
  }
  add(sub) {
    this.subs.push(sub)
  }
  notify(...args) {
    this.subs.forEach(sub => {
      sub.update(...args)
    })
  }
}

// 订阅者
class Sub{
  constructor() {
    PubSub.target = this
  }
  update(...args) {
    console.log('view update', ...args)
  }
}

class Vue {
  constructor(options) {
    
    const data = options.data
    this._data = options.data
    
    Object.keys(data).forEach(key => {
      this.proxy(key)
    })
    new Sub()
    observe(data)
  }
  // 将data数据代理到vue本身上
  proxy(key) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: () => this._data[key],
      set: newVal => {
        this._data[key] = newVal
      }
    })
  }
}

const a = new Vue({
  data: {
    name: 'demo',
    describe: 'test'
  }
})
// get
console.log(a.name)
// set
a.name = 'demo2'

