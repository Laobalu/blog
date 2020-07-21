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