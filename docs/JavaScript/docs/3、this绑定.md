# this何时确定：
this在执行上下文创建阶段确定，也就是函数被调用时确定。this具有运行期绑定的特性，this的值取决于函数如何被调用。
# 调用位置
1. 全局上下文，this都指向全局对象。
2. 函数上下文  
	① 直接调用，指向undefined。但是在非严格模式中，当this指向undefined时，它会被自动指向全局对象。回调函数(非箭头函数)也属于直接调用。  
	② call/apply/bind，this绑定到指定对象。  
	③ 箭头函数，会捕获其所在上下文的this值，作为自己的this值。
3. 作为对象的一个方法，this指向调用函数的对象。
4. 作为构造函数，this指向构造函数创建的实例。  
通过构造函数创建一个对象其实执行这样几个步骤： 创建新对象；将this指向这个对象；给对象赋值（属性、方法）；返回this。
5. DOM事件处理函数，this指向DOM元素节点。

# 调用顺序：
如果要判断一个函数的this绑定，就需要找到这个函数的直接调用位置。然后可以顺序按照下面四条规则来判断this的绑定对象：  
1. 由new调用：绑定到新创建的对象
2. 由call或apply、bind调用：绑定到指定的对象
3. 由上下文对象调用：绑定到上下文对象
4. 默认：全局对象

# call/apply
`call()`/`apply()`方法使用一个指定的 this 值和单独给出的一个或多个参数来**调用一个函数**。两者区别仅仅参数传递方式不同。
```js
fun().call(thisArg, arg1, arg2)
fun().apply(thisArg, [arg1, arg2])
```
## call模拟实现
我们以call为例，实现call有三个关键点：  
1. call改变被调用函数的this指向
2. 参数传入被调用函数
3. 执行被调用函数
```js
const foo = {
  name: 'lee'
}
function fun(job) {
  console.log(this.name, job)
}
fun.call(foo, 'teacher') // lee teacher
```

试想要改变`fun`中this指向`foo`,是不是只要给`foo`添加一个与`fun`相同的函数，执行后再删除就可以了。
```js
foo.fn = fun
foo.fn()
delete foo.fn
```

```js
Function.prototype.myCall = function(context=window) {
  const fn = Symbol() // 临时属性，唯一
  context[fn] = this // 首先要获取调用call的函数，这里this指向调用函数fun
  const args = [...arguments].slice(1) // 参数
  const result = context.fn(...args)
  delete context.fn // 删除函数
  return result
}
fun.myCall(foo, 'teacher')
```
apply实现也类似，只是参数处理方式不一样。

# bind
    bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。  
与call/apply不同，bind并不会立即调用，会返回一个原函数的拷贝。  

### 基础用法，修改this值
```js
const foo = {
  name: 'lee'
}
function fun() {
  console.log(this.name)
}
const funBind = fun.bind(thisArg)
funBind() // lee
```
### 偏函数
bind() 的另一个最简单的用法是使一个函数**拥有预设的初始参数**。只要将这些参数（如果有的话）作为 bind() 的参数写在 this 后面。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。
```js
function fun2() {
    console.log(...arguments)
}
const fun3 = fun2.bind(null, 1, 2)
fun3(3) // 1, 2, 3
```
## bind实现
① 第一步基础实现，通过call/apply模拟一个bind，修改this绑定，并返回一个函数。
```js
function myBind(context) {
  const thatFunc = this // 被调用函数
  const args = [...arguments]
  return function() {
    return thatFunc.apply(context, args.slice(1))
  }
}
Function.prototype.bind = Function.prototype.bind || myBind
```
② 第二步柯里化，实现参数预设
```js
function myBing(context) {
  if(typeof this !== 'function') {
    throw new Error('arguments error')
  }
  const thatFunc = this
  const args = Array.prototype.slice(arguments, 1)
  return function() {
    const finalArgs = [...args, ...arguments]
    return thatFunc.apply(context, finalArgs)
  }
}
```