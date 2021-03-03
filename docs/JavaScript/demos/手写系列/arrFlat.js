// 数组扁平化
let arr = [1, [2, [3, [4, 5]]], 6] // -> [1, 2, 3, 4, 5, 6]
let str = JSON.stringify(arr)

// 1. es6 flat语法 arr.flat([depth])
const arr1 = arr.flat(Infinity)
console.log('1--\n', arr1)

// 2. replace正则 + split
const arr2 = str.replace(/\[|\]/g, '').split(',').map(item => parseInt(item))
console.log('2--\n', arr2)

// 3. 普通递归
function flat(arr) {
  let result = []
  if (!Array.isArray(arr)) return
  for(let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flat(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
const arr3 = flat(arr)
console.log('3--\n', arr3)

// 4. reduce迭代，reduce(callback(accumulator, currentValue), initialValue)
function flat2(arr){
  arr.reduce((accu, curr) => {
    return accu.concat(Array.isArray(curr) ? flat2(curr) : curr)
  }, [])
}
const arr4 = flat(arr)
console.log('4--\n', arr4)

// 5. 扩展运算符 + concat
function flat3(arr) {
  while(arr.some(Array.isArray)) {
    arr = [].concat([...arr])
  }
  return arr
}
const arr5 = flat(arr)
console.log('5--\n', arr5)