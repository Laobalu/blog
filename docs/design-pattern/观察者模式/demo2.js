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