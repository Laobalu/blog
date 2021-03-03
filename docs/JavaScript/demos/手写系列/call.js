// call/apply模拟实现
/**
 * fn.call(thisArg)
 * 核心：
 * 1. call改变调用函数的this指向
 * 2. 参数传入被调用函数
 * 3. 执行被调用函数
 * 关键思路：在call传入的thisArg对象上添加fn函数，这样fn函数内部的this就绑定到thisArg上了，thisArg.fn执行后再删除
 */
Function.prototype.myCall = function(context = window) {
  const fn = Symbol()
  context[fn] = this
  const args = [...arguments].slice(1)
  const result = context[fn](...args)
  delete context.fn
  return result
}

var name = 'lilei'
const foo = {
  name: 'hanmeimei'
}
function fn() {
  console.log(this.name, ...arguments)
}
// 浏览器环境
fn('male') // lilei male
fn.call(foo, 'female') // hanmeimei female
// 在node环境中，顶层作用域var定义的变量挂载在global上，this指向空对象{}