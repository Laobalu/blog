// 普通预加载
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

// 虚拟代理实现图片懒加载
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