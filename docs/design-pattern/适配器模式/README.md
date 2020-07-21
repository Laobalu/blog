## 适配器模式
适配器通俗来讲就是接口转换器，生活中最常见的栗子就是电源适配器。所以适配器模式其实就是**把一个类的接口转变成我们所期待的另一种接口**，来帮助我们解决**两个对象间接口不兼容问题**。适配器模式使得原本由于接口不兼容而不能一起工作的那些类（对象）可以一起工作。


### 使用场景
简单来说就是用来**兼容接口**的。如果一个类实现层的问题不大，但要解决一部分的适配问题的话，那适配器模式就是很好的选择。如果内部的实现出了问题，那应该全面优化代码。适配器不应该去改变实现层，那不属于他的职责范围。

```javascript
// usb接口
class Usb {
  connect() {
    console.log('connect usb');
    // 相同逻辑...
  }
}
// typec接口
class TypeC {
  connectTypeC() {
    console.log('connect typec');
    // 相同逻辑...
  }
}

// typec适配器，将typec接口暴露为usb接口
class TypeCAdapter extends TypeC {
  constructor() {
    super();
  }
  connect() {
    this.connectTypeC();
  }
}

// 外部调用，统一接口
const connect = (connector) => {
  connector.connect();
}

connect(new Usb());
connect(new TypeCAdapter());
```