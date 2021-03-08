// 解决js中setInterval计时器不准的问题
// 用setTimeout递归去模拟setInterval,每次递归修正时间

const startTime = new Date().getTime()
let count = 0
const delay = 1000

function fixedTimer() {
  count++
  const offset = new Date().getTime() - startTime - count*delay
  const nextDelay = offset < delay ? (delay - offset) : 0
  setTimeout(fixedTimer, nextDelay)
}
setTimeout(fixedTimer, delay)