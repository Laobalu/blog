// 深拷贝
/**
 * 核心
 * 1. 普通对象和数组递归调用
 * 2. 解决循环调用，栈溢出问题
 *    例如obj.a = obj
 * 3. 解决引用丢失问题，原对象多个属性引用相同，拷贝后引用不同。 
 *    例如：obj.a = arr; obj.b = arr; 拷贝后newObj.a 和newObj.b不是指向同一地址。
 */

const isObject = (obj) => {
  // return Object.prototype.toString.call(obj) === '[object Object]'
  return typeof obj === 'object' && obj !== null
}
const deepClone = (target, map = new WeakMap()) => {
  if(map.has(target)) {
    return map.get(target)
  }
  if (isObject(target)) {
    const copyTarget = Array.isArray(target) ? [] : {}
    map.set(target, copyTarget)
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
obj.target = obj
const result = deepClone(obj)
obj.b.d.pop()
obj.b.c = 1
console.log(obj, result.target)

/**
 * ---------------------------------
 * 完整版，加上其他类型的拷贝
 */

// 获取拷贝初始值，如{}就是new Object(); []就是new Array();
const getInit = (target) => {
  const Ctor = target.constructor
  return new Ctor()
}
// 获取类型
const getType = (target) => {
  return Object.prototype.toString.call(target)
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
      case boolTag:
      case numberTag:
      case stringTag:
      case errorTag:
      case dateTag:
          return new Ctor(targe);
      case regexpTag:
          return cloneReg(targe);
      case symbolTag:
          return cloneSymbol(targe);
      default:
          return null;
  }
}


const deepCloneComplete = (target, map = new Map()) => {
  // 克隆原始类型
  if(!isObject(target)) return target

  const canEnum = [
    '[object Object]',
    '[object Array]',
    '[object Map]',
    '[object Set]',
  ]
  const mapTag = '[object Map]'
  const setTag = '[object Set]'
  // 初始化
  let targetClone
  const type = getType(target)
  if(canEnum.includes(type)) {
    targetClone = getInit(target)
  } else {
    return target
    // 克隆Date/RegExp/Boolean等不可枚举对象
    // return cloneOtherType(target)
  }

  // 解决循环调用问题
  if(map.has(target)) return map.get(target)
  map.set(target, targetClone)

  
  if (type === mapTag) {
    // 克隆map
    target.forEach((value, key) => {
      targetClone.set(key, deepCloneComplete(value))
    })
  } else if (type === setTag) {
    // 克隆set
    target.forEach(value => {
      targetClone.add(deepCloneComplete(value))
    })
  } else {
    // 克隆object, array
    Reflect.ownKeys(target).forEach(key => {
      targetClone[key] = deepCloneComplete(target[key], map)
    })
  }
  return targetClone
}

const newObj = {
  a: 1,
  b: [2,3],
  c: {
    d: new Map(),
    e: new Set()
  },
  f: null
}

console.log('complete', deepCloneComplete(newObj))
