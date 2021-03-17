// 节流，核心原理：在一次定时器时间范围内再次触发则不予理会。
// 即某一时间段内只能触发一次
/**
 * 节流
 * 核心原理：某一时间段内只能触发一次
 * 案例：屏幕缩放，滚动条事件
 * @param {*} fn 
 * @param {*} interval 
 */
function throttle(fn, interval) {
  let flag = true
  return function(...args) {
    if(!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, interval)
  }
}

let btn1 = document.getElementById('btn1')
btn1.onclick = throttle(function() {
  console.log(this)
}, 1000)

/**
 * 防抖
 * 核心原理：某一时间段，多次触发函数，只执行最后一次触发
 * 案例：搜索框输入值时自动搜索
 */
function debounce(fn, interval) {
  let timer = null

  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, interval)
  }
}

let btn2 = document.getElementById('btn2')
btn2.onclick = debounce(function() {
  console.log(this)
}, 1000)


// 加强版节流。现在我们可以把防抖和节流放到一起，为什么呢？
// 因为防抖有时候触发的太频繁会导致一次响应都没有，我们希望到了固定的时间必须给用户一个响应
function throttle2(fn, interval) {
  let last = 0
  let timer = null
  return function(args) {
    const now = new Date()
    // 节流
    if(now - last < interval) {
      // 防抖
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
        last = now
      }, interval)
    } else {
      fn.apply(this, args)
      last = now
    }
  }
}

let btn3 = document.getElementById('btn3')
btn3.onclick = throttle2(function() {
  console.log(this)
}, 1000)