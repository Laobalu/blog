# 单例模式
**保证一个类仅有一个实例，并提供一个访问它的全局访问点**，这样的模式就叫单例模式。

#### 思考：如何保证一个类只有一个实例？
解答：需要构造函数本身**具备判断自己是否已经创建过一个实例**的能力。
```javascript
class Single {
  construct() {}
  static getInstance() {
    if (!this.instance) { // 静态方法this指向类，而不是实例
      this.instance = new Single();
    }
    return Single.instance;
  }
}
const a = Single.getInstance();
const a = Single.getInstance();
console.log(a === b); // true
```
es5可以用闭包来实现
```javascript
Single.protoptye.getInstance = (function() {
  var instance = null;
  return function() {
    if (!instance) {
      instance = new Single();
    }
    return instance;
  }
})()
```