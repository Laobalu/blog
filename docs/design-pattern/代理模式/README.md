>代理模式更像是一个中转过程，某些情况下本体对象不能直接访问，需要为本体对象找一个替代对象，以便对本体对象进行访问。代理对象与本体对象接口需要一致，以此达到对本体对象的访问控制。  

比如代购：我们需要去国外买个LV，自己去不了，所以需要代购在国外买了再给你。  

再比如vpn：我们不能直接访问外网，需要代理服务器作为中转。客户端的所有请求先经过代理服务器，由代理服务器再去请求真实服务器。请求成功后，再由代理服务器将真实服务器的响应结果返回客户端。
  
代理模式的变体有多种：保护代理、虚拟代理、缓存代理等等，这里只介绍这常用的三种。
### 保护代理
>保护代理主要用于控制不同权限的对象**对本体对象的访问权限**，符合条件的才能访问，起到过滤作用。
```javascript
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
```  
本例中游客与导游（游客代理）具有相同接口，游客本身只关心自己的行为。我们调用导游类，在满足条件时，执行与本体相同的代码。这里导游就是保护代理，起到过滤作用。当我们需要保护代理时，可以优先使用es6新增的proxy实现。  

### 虚拟代理  
>对本体方法的调用进行管理，等时机合适再执行。  
作用：将开销很大的对象，延迟到真正需要它的时候再执行。  

图片预加载：当网络不好或者图片太大，页面加载图片时间过长，会导致用户体验不好。这时我们就需要预加载处理，先让img标签展示一个打底图片，然后新创建一个img标签去加载大图，监听大图加载完成，网站有了大图的缓存后，然后将页面上img的src指向大图地址。因为有缓存的关系，所有从打底图到真实图片的切换非常快，大大优化用户体验。

请看下面预加载例子
```javascript
class Preload{
  static preloadSrc = 'xxx';
  constructor(imgNode) {
    this.imgNode = imgNode;
  }
  setSrc(realUrl) {
    this.imgNode.src = this.preloadSrc;
    // 创建一个用来加载真实地址的中转img对象
    const tempImg = new Image();
    tempImg.src = realUrl;
    tempImg.onload = () => {
      // 当图片加载完成，imgNode加载真实地址
      this.imgNode.src = realUrl;
    }
  }
}
```
Preload类不仅要负责图片的加载，还要负责dom的操作。这样其实违反了**单一职责原则**。我们可以通过虚拟代理将逻辑分离，LoadImg负责设置图片地址，LoadImgProxy负责加载图片。

```javascript
class LoadImg {
  constructor(imgNode) {
    this.imgNode = imgNode;
  }
  setSrc(url) {
    this.imgNode.src = url;
  }
}

class LoadImgProxy {
  static preloadSrc = 'xxx';
  constructor(targetImg) {
    this.targetImg = targetImg;    
  }
  setSrc(realUrl) {
    this.targetImg.setSrc(this.preloadSrc);
    const img = new Image();
    img.src = realUrl;
    img.onload = () => {
      this.targetImg.setSrc(realUrl);
    }
  }
}

const realUrl = 'ccc';
const loadProxy = LoadImgProxy(new LoadImg(imgNode));
loadProxy.setSrc(realUrl)
```
这里LoadImgProxy实现了图片预加载的相关工作，LoadImg只需关心它的本职工作，设置图片地址。例子里面新建的img标签代替了真是的dom去请求图片，完成图片加载工作，却没在渲染层出现，因此这种模式被称为虚拟代理模式。当未来网络已经快到不需要预加载，我们只需要去掉LoadImgProxy直接使用LoadImg即可。

### 缓存代理
缓存代理为一些开销大的运算提供缓存，以空间换时间。
```javascript
function mult() {
  const args = Array.from(arguments);
  return args.reduce((prev, next) => prev * next);
}

const test = mult(1, 2, 3); // 6

const multProxy = (function() {
  const cache = {};

  return function() {
    const args = Array.from(arguments);
    const key = args.join(',');
    if (!cache[key]) {
      console.log('mult')
      cache[key] = mult(...args);
    }
    return cache[key];
  }
})()

const test1 = multProxy(1, 2, 3); // mult 6
const test2 = multProxy(1, 2, 3); // 6
```

### 小结
从以上案例可以看出代理模式的变种多样，访问权限、功能拓展、性能优化等等。但代理模式的套路都基本一致：A不能直接访问B，A需要借助一个代理器去访问B。代理器与B有着相同的接口。