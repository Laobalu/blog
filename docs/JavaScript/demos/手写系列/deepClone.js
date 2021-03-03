// 深拷贝
/**
 * 核心
 * 1. 普通对象和数组递归调用
 * 2. 解决循环调用，栈溢出问题
 *    例如obj.a = obj
 * 3. 解决原对象多个属性引用相同，拷贝后引用不用问题。 
 *    例如：obj.a = arr; obj.b = arr; 拷贝后newObj.a 和newObj.b不是指向同一地址。
 */

const isObject = (obj) => {
  // return Object.prototype.toString.call(obj) === '[object Object]'
  return typeof obj === 'object' && typeof obj !== 'null'
}
const deepClone = (target, map = new WeakMap()) => {
  if(map.has(target)) {
    return target
  }
  if (isObject(target)) {
    const copyTarget = Array.isArray(target) ? [] : {}
    map.set(copyTarget, true)
    Reflect.ownKeys(target).forEach(key => {
      copyTarget[key] = deepClone(target[key], map)
    })
    return copyTarget
  } else {
    return target
  } 
}

const obj = {
  a: 123,
  b: {
    c: 4,
    d: [5, 6],
    e: function() {}
  }
}
// obj.target = obj

const result = deepClone(obj)
obj.b.d.pop()
console.log(obj, result)