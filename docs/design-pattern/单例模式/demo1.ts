class Single {
  private static instance: Single;
  static getInstance() {
    if (!this.instance) { // 静态方法this指向类，而不是实例
      this.instance = new Single();
    }
    return Single.instance;
  }
}
const a = Single.getInstance();
const b = Single.getInstance();
console.log(a)
console.log(a === b); // true