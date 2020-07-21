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

