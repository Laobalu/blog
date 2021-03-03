// 判读回文序列，核心：递归
// 1. 边界 2. 返回值
function isPalindrome(str) {
  const len = str.length
  if (len <= 1) return true
  const nextStr = str.slice(1, -1)
  return (str[0] === str[len - 1]) && isPalindrome(nextStr)
}

console.log(isPalindrome('abccba')) // true
console.log(isPalindrome('abcba')) // true
console.log(isPalindrome('abcaba')) // false