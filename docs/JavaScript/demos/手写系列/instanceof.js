// 核心：原型链向上查找，left原型链上包含right.prototype，则为true

function myInstanceof(left, right) {
  // 基本数据类型返回false
  if(typeof left !== 'object' || typeof left === 'null') {
    return false
  }
  // 获取原型
  let proto = Object.getPrototypeOf(left)
  while(proto !== null) {
    if(proto === right.prototype) {
      return true
    } 
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

// test
console.log(myInstanceof(111, Number))  //false
console.log(myInstanceof(new Number(111), Number))  //true