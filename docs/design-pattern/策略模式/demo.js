
const strategies = {
  isNonEmpty(value = '', errorMsg = '') {
    if(value === '')
      return errorMsg
  },
  minLength(value, errorMsg) {
    if (value.length < 6) {
      return errorMsg;
    }
  }
}

class Validator{
  constructor() {
    this.cache = [];
  }
  add(value, rules) {
    this.cache = rules.map((rule, index) => {
      const {strategy, errorMsg} = rule;
      return function() {

        return strategies[strategy](value, errorMsg);
      }
    })
  }
  start() {
    
    for(let i=0, strategyFunc; strategyFunc = this.cache[i]; i++) {
      const errorMsg = strategyFunc();
      if(errorMsg) {
        return errorMsg;
      }
    }
    return '校验通过';
  }
}

const data1 = '';
const data2 = 'test';
const data3 = 'test success';
const validata = new Validator();

validata.add(data3, [{
  strategy: 'isNonEmpty',
  errorMsg: '不能为空'
}, {
  strategy: 'minLength',
  errorMsg: '不能小于6位'
}])

const msg = validata.start();
console.log(msg);