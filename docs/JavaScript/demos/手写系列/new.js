/**
 * new核心
 * 内存中新建一个空对象
 * 该对象的[[prototype]]指向构造函数的原型
 * 构造函数内部的this指向该对象
 * 执行构造函数代码（给该对象添加属性）
 * 返回该对象，注意：如果构造函数本身有返回值且为对象，则会返回这个返回值
 */

function _new_es3(fn) {
  if(typeof fn !== 'function') {
    console.error('参数错误')
    return
  }
  // 1.创建新对象
  var obj = new Object()
  var args = Array.prototype.slice.call(arguments, 1)
  // 2.绑定原型对象
  obj.__proto__ = fn.prototype
  // 3.修改this指向，执行构造函数
  var result = fn.apply(obj, args)
  // 返回
  return result instanceof Object ? result : obj
}

// test
function P(name) {
  this.name = name
}

var p1 = _new_es3(P, 'lilei')
console.log(p1.name) // lilei

// es6可以通过Object.create(prototype)来简化代码
function _new_es6(fn, ...args) {
  if(typeof fn !== 'function') {
    console.error('参数错误')
    return
  }
  const obj = Object.create(fn.prototype)
  const result = fn.apply(obj, args)
  return result instanceof Object ? result : obj
}

const p2 = _new_es6(P, 'hanmeimei')
console.log(p2.name) // hanmeimei