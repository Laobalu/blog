const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 让不同的promise代码相互调用
const handlePromise = (result, newPromise, resolve, reject) => {
  if(result === newPromise) {
    throw new Error('error')
  }
  if(result !== null && (typeof result === 'function' || typeof result === 'function')) {
    // 加锁，保证第三方thenable函数只能同时执行resolve或reject
    let lock = false
    try {
      const then = result.then
      // 是否为thenable(判断返回的是不是promise)，递归调用，直到返回非promise
      if(typeof then === 'function') {
        then.call(
          result,
          (r) => {
            if(lock) return
            handlePromise(r, newPromise, resolve, reject)
            lock = true
          },
          (e) => {
            if(lock) return
            reject(e)
            lock = true
          },
        )
      } else {
        resolve(result)
      }
    } catch (error) {
      reject(error)
    }
  } else {
    resolve(result)
  }
}

class TPromise {
  state = PENDING
  result = undefined
  reason = undefined
  onResolvedArr = []
  onRejectedArr = []
  constructor(excution) {
    const resolve = (result) => {
      if(this.state === PENDING) {
        this.state = FULFILLED
        this.result = result
        this.onResolvedArr.map(fn => fn())
      }
    }
    const reject = (reason) => {
      if(this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedArr.map(fn => fn())
      }
    }
    try {
      excution(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : (data) => data
    onRejected = typeof onRejected === 'function' 
      ? onRejected 
      : (err) => {
        // 这里抛错会被reject出去，因为onReject运行在tryCatch里面
        throw new Error(err)
      }
    const newPromise = new TPromise((resolve, reject) => {
      if(this.state === FULFILLED) {
        // 异步执行
        setTimeout(() => {
          try {
            // then的返回值
            const result = onResolved(this.result)
            // 将上一个then的返回值，传给下一个then
            handlePromise(result, newPromise, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if(this.state === REJECTED) {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason)
            handlePromise(result, newPromise, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }) 
      }
      // promise状态还没发生改变，先缓存进数组，状态变化后统一调用（发布订阅模式）
      if(this.state === PENDING) {
        this.onResolvedArr.push(() => {
          try {
            const result = onRejected(this.reason)
            handlePromise(result, newPromise, resolve, reject)
          } catch (error) {
            reject(error)
          }
          const result = onResolved(this.result)
          handlePromise(result, newPromise, resolve, reject)
        })
        this.onRejectedArr.push(() => {
          try {
            const result = onRejected(this.reason)
            handlePromise(result, newPromise, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
    })
    return newPromise
  }

  catch(onRejected) {
    this.then(undefined, onRejected)
  }
}

module.exports = TPromise
