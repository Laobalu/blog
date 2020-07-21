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