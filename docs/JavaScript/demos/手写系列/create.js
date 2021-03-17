Object.create = (proto, propertiesObject) => {
  if (propertiesObject === null) throw 'TypeError'
  function F() {}
  F.prototype = proto
  const o = new F()

  Object.defineProperties(o, propertiesObject)
  if (proto === null) {
    o.__proto__ = null
  }
  return o
}