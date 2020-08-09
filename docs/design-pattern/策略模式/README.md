> **定义一些列的算法，把他们一个个封装起来，并且使他们可以相互替换。**策略模式的目的就是拆分胖逻辑，将算法的使用和算法的实现分离开来。一个基于策略模式的程序至少由两部分组成。一是策略类（Strangers）封装了具体的方法，一是环境类（Context）维持对某个策略对象的引用。  

我们来看一个很常见的需求：表单校验。
```javascript
const registerForm = document.getElementById('form');
registerForm.onSubmit = function() {
  let errorMsg = '';
  if (registerForm.userName.value === '') {
    errorMsg = '用户名不能为空！'
    return errorMsg;
  }
  if (registerForm.password.value.length < 6) {
    errorMsg = '密码不能少于6位！'
    return errorMsg;
  }
  // else validate...
}
```
可以看到校验函数里面所有校验逻辑堆砌在一起，并且充斥了大量的if代码。违反了设计模式中的单一职责原则，和封闭开放原则。我们使用策略模式来重构表单校验代码。
#### 封装策略类
```javascript
const strategies = {
  isNonEmpty(value = '', errorMsg = '') {
    if(value === '')
      return errorMsg
  },
  minLength(value, errorMsg) {
    if (value.length < 6) {
      return errorMsg;
    }
  }
}
```

#### 封装校验类（context）
```javascript
class Validator{
  constructor() {
    this.cache = [];
  }
  add(value, rules) {
    this.cache = rules.map((rule, index) => {
      const {strategy, errorMsg} = rule;
      return function() {

        return strategies[strategy](value, errorMsg);
      }
    })
  }
  start() {
    
    for(let i=0, strategyFunc; strategyFunc = this.cache[i]; i++) {
      const errorMsg = strategyFunc();
      if(errorMsg) {
        return errorMsg;
      }
    }
    return '校验通过';
  }
}
```

#### 调用
```javascript
const data1 = '';
const data2 = 'test';
const data3 = 'test success';
const validata = new Validator();

validata.add(data3, [{
  strategy: 'isNonEmpty',
  errorMsg: '不能为空'
}, {
  strategy: 'minLength',
  errorMsg: '不能小于6位'
}])

validata.start(); // 校验通过
```