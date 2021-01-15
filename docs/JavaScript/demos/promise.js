const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function isFunction(fn) {
  return typeof fn === 'function'
}

function Promise() {
  this.state = PENDING
  this.result = null
  this.callbacks = []
}

/**
 * 状态迁移函数，只会在state为pending时，进行状态迁移
 * @param {*} promise Promise实例
 * @param {string} state 当前状态
 * @param {*} result 结果
 */
const transition = (promise, state, result) => {
  if(promise.state !== PENDING) return
  promise.state = state
  promise.result = result
}

const handleCallback = (callback, state, result) => {
  let {onFulfilled, onReject, resolve, reject} = callback
  try{
    if(state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
    } else if(state === REJECTED) {
      isFunction(onReject) ? resolve(onReject(result)) : reject(result)
    }
  } catch(err) {
    reject(err)
  }
}

// 1. 接收onFulfilled、onReject两个参数
// 2. 必须返回promise
// 3. then方法会被调用多次，每次注册一组 onFulfilled 和 onRejected 的 callback。它们如果被调用，必须按照注册顺序调用。
Promise.prototype.then = function(onFulfilled, onReject) {
  return new Promise((resolve, reject) => {
    let callback = {onFulfilled, onReject, resolve, reject}

    if(this.state === PENDING) {
      this.callback.push(callback)
    } else {
      setTimeout(() => handleCallback(callback, this.state, this.result), 0)
    }
  })
}

