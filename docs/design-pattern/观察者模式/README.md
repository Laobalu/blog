## 观察者模式
>观察者模式定义了一种一对多的关系，让多个观察者对象同时监听某一个目标对象，当目标对象的状态发生改变时，会通知所有观察者对象，使观察者能自动更新。

我们分为两步来实现观察者模式。  
1. 实现发布订阅功能，使发布者能手动通知到所有观察者更新。
2. 通过发布者状态改变，能自动通知所有观察者更新。  

### 发布订阅
```javascript
// demo1.js
// 发布者类
class Publisher {

  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer)
  }

  remove(observer) {
    this.observers = this.observers.filter(item => {
      return item.name !== ovserver.name;
    })
  }

  notify() {
    this.observers.forEach(observer => {
      observer.do(this);
    });
  }
}

// 观察者类
class Observer {

  constructor(name) {
    this.name = name;
  }

  do() {
    console.log(`${this.name} do something`);
  }
}

// eg
const publisher = new Publisher();
const lilei = new Observer('lilei'); 
const hanmeimei = new Observer('hanmeimei');

publisher.add(lilei);
publisher.add(hanmeimei);
publisher.notify();

export { Publisher, Observer };
```

### 状态更改，自动通知
```javascript
// demo2.js
import { Publisher, Observer } from './demo1';

// 订阅者监听发布者的某状态变化

class ProPublisher extends Publisher{
  
  constructor() {
    super();
    this.state = '';
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.notify();
  }
}

class ProObserver extends Observer{

  constructor(name) {
    super(name);
  }

  // 这里拿到发布者本身，从而获取状态
  do(publisher) {
    const state = publisher.getState();
    console.log(`${this.name} is ${state}`);
  }
}

// eg
const dorm = new ProPublisher();
const zhangsan = new ProObserver('zhangsan');
const lisi = new ProObserver('lisi');

dorm.add(zhangsan);
dorm.add(lisi);
// 现在发布者状态改变，宿舍熄灯了，所有人去睡觉
dorm.setState('sleeping');
```
