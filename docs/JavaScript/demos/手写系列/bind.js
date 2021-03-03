// bind模拟实现
/**
 * 1. 修改this绑定，并返回一个函数
 * 2. 参数预设
 * 3. 对于构造函数，要保证构造函数原型上的属性不会丢失
 */

Function.prototype.myBind = function(context, ...args) {
  if(typeof this !== 'function') {
    throw new Error('arguments typeError')
  }
  const self = this

  const fBound = function() {
    return self.call(context, ...args, ...arguments)
  }
  fBound.prototype = Object.create(this.prototype)
  return fBound
}