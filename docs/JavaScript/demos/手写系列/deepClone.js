// 深拷贝

const isObject = (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
const deepClone = (target) => {
  const isAry = Array.isArray(target)
  const isObj = isObject(target)
  const copyTarget = isAry ? [] : {}
  if (!isAry && !isObj) {
    return target
  } else {
    Reflect.ownKeys(target).forEach(key => {
      copyTarget[key] = deepClone(target[key])
    })
    return copyTarget
  } 
}