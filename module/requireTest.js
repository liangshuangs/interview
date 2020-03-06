/**
 * @desc 实现一个简易的模块化规范
 */
const path = require('path')
const fs = require('fs')
const vm = require('vm')
function Module(path) {
    this.id = path;
    this.exports = {}
}
Module.caches  = {}
Module.prototype.require = function (path) {
    return Module._load(path)
}
Module.prototype.load = function(filename) {
    filename = path.resolve(__dirname, filename)
    let content = fs.readFileSync(filename, 'utf8')
    let warper = Module.wrap(content)
    let compiledWrapper = vm.runInThisContext(warper, {
        filename: filename,
        lineOffset: 0,
        displayErrors: true
      })
      return compiledWrapper.call(this.exports, this.exports,requireTest, this)

}
Module.wrap = function (script) {
    return `(function (exports, require, module, __filename, __dirname) {
        ${script}
      })`
  }
Module._load = function(path) {
    let cache = Module.caches[path]
    if(cache) {
        return cache.exports
    }
    let module = new Module(path)
    Module.caches[path] = module
    module.load(path)
    return module.exports
}

function requireTest(path) {
    let module = new Module(path);
    let res =  module.require(path)
    console.log(res,'res')
    return res
}
let test= requireTest('./test.js')
console.log(test,'ttt')
test.test()