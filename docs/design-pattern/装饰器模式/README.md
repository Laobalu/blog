>装饰器模式允许**向一个现有的对象添加新的功能，同时又不改变其结构**。他是对现有类对包装，并提供了额外对功能。

#### 下面看一个简单栗子
```js
// 
class Circle{
  draw() {
    console.log('prit circle');
  }
}

class DecoratorCircle{
  public circle = null;
  constructor(circle:Circle) {
    this.circle = circle;
  }
  draw() {
    this.circle.draw();
    this.setBorder();
  }
  setBorder() {
    console.log('set border');
  }
}

const circle = new Circle();
circle.draw();

// 装饰器
console.log('decorator');
const decorator = new DecoratorCircle(circle);
decorator.draw();
```

## es7的装饰器
es7新增了装饰器方法，他可以对一些对象进行包装，然后返回被包装的对象，可装饰的对象包括类、属性、方法等。详细语法可查看阮一峰的[es6教程-decorator](https://es6.ruanyifeng.com/#docs/decorator)。  

### 修饰类本身
```js
// target为被修饰的类本身
function testDecoratot(target) {
  target.desc = 'decorator';
}
@testDecoratot
class Demo {

}
console.log(Demo.desc); // 输出decorator
```
可以通过高阶函数向装饰器传参。

```js
function testDecoratot(desc) {
  return function(target) {
    target.desc = desc;
  }
}
@testDecoratot(decorator)
class Demo {

}
console.log(Demo.desc); // 输出decorator
```
可以通过修饰器实现mixins
```js
function mixins(...list) {

  return function(target) {
    Object.assign(target.prototype, list)
  }
}
const fns = {
  fn1() {
    console.log('fn1');
  },
  fn2() {
    console.log('fn2');
  }
}
@mixins(fns)
class Demo{

}
const foo = new Demo();
console.log(foo.fn1()); // 输出 fn1
```  
    @decorator
    class A()
    其实可以看作
    class A {};
    A = decorator(A) || A
### 修饰类的方法
```js
/**
 * target:类的原型对象，name
 * name:修饰的方法名
 * descriptor:描述对象，类似Object.defineProperty
**/
function funcDecorator(target, name, descriptor) {
  let originalMethod = descriptor.value;
  // 重写原方法
  descsriptor.value = function() {
    console.log('do something else');
    return originalMethod.apply(this, arguments);
  }
  return descriptor;
}
class Button {
  @funcDecorator
  onClick() {
    console.log('do something');
  }
}
const button = new Button()
button.onClick(); // 输出 do something else \t do somehting
```
修饰类的方法其实就是修饰类的原型对象，所以target为累的原型。  
注意：修饰器函数**在编译阶段**就执行了，执行的时候，类的实例还不存在。

### 三方开源库，core-decorators
[core-decorators](https://github.com/jayphelps/core-decorators.js)提供了一些使用频率高的装饰器。
