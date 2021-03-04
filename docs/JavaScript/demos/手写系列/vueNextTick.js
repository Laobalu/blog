// vue中nextTick的实现
let queueCbs = []
let pending = false

function nextTick(cb) {
  queueCbs.push(cb)
  
  if (!pending) {
    setTimeout(() => {
      pending = true
      const copyCbs = queueCbs.slice()
      queueCbs.length = 0
      copyCbs.forEach(cb => {
        cb()
      })
    }, 0)
  }
}