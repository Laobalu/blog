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