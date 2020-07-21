// 保护代理

// 用户类
class Visitor {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
  getName() {
    return this.name;
  }
  getLevel() {
    return this.level;
  }
  gotoDancingFloor() {
    console.log('去舞池！');
  }
  gotoRoom() {
    console.log('去包厢！');
  }
}

// 导游（代理用户）
class TourGuide {
  constructor(visitor) {
    this.visitor = visitor;
  }
  getName() {
    this.visitor.getName();
  }
  getLevel() {
    this.visitor.getLevel();
  }
  gotoDancingFloor() {
    if (this.visitor.getLevel() >= 1) {
      console.log('去舞池！');
    } else {
      console.log('无权限！');
    }
  }
  gotoRoom() {
    if (this.visitor.getLevel() >= 3) {
      console.log('去包厢！');
    } else {
      console.log('无权限！');
    }
  }
}

const visitor1 = new Visitor('lilei', 1);
const visitor2 = new Visitor('fofo', 3);

const guide1 = new TourGuide(visitor1)
const guide2 = new TourGuide(visitor2)

guide1.gotoDancingFloor();
guide1.gotoRoom();

guide2.gotoDancingFloor();
guide2.gotoRoom();

// 本例中游客与导游（游客代理）具有相同接口，游客本身只关心自己的行为。我们调用导游类，在满足条件时，执行与本体相同的代码。这里导游就是保护代理，起到过滤作用