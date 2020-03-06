# Module对象
node 内部提供了一个Module构建函数，所有的模块都是Module的实例
模块化的好处
1. 避免命名冲突
2. 更好的分离,按需加载
3. 更高的复用性
// 高可维护性

开始的函数的写法,这样的写法，造成的问题
1. 污染全局命名空间，容易引起命名冲突
```
function m1() {
    let name = "m1"
    console.log(name)
}
function m2() {
    let name = "m2"
    console.log(name)
}
```
命名空间模式：用用对象进行封装
1. 减少全局变量，解决命名冲突
数据不安全，myModule.name ="test" 内容的属性可以被外部改写
```
let myModule = {
    name: 'www.baidu.com',
    m1() {
        console.log(this.name)
    },
    m2() {
        console.log(this.name)
    }
}
```
IIFE模式：匿名函数纸自调用（闭包）
数据是私有的，外部只能通过暴露的方法操作
这样myModule.foo() // 即可执行函数
myModule.data ="test" 不是修改模块内部的data
问题：如果当前的这个模块依赖另外一个模块怎么办
```
(function(window){
    let data = "www.baidu.com"
    function foo() {
        console.log(`foo():${data}`)
    }
    function bar() {
        console.log(`bar():${data}`)
    }
    window.myModule = {foo, bar} // 暴露给外部
})(window)
```
 IIFE模式：引入外部依赖
 ```
 (function(window,$){
    let data = "www.baidu.com"
    function foo() {
        console.log(`foo():${data}`)
        $('body').css('background','red')
    }
    function bar() {
        console.log(`bar():${data}`)
    }
    window.myModule = {foo, bar} // 暴露给外部
})(window,jquery)
 ```
放大模式
如果一个模块很大，必须分成几个部分，或者一个模块需要继承另外的模块
```
let module1 = (function(mod) {
    mod.m3 = function() {
        // 
        console.log('m3')
    }
    return mod
})(module1)
```
 宽放大模式
  在浏览器中，模块的各个部分通常是从网上获取的，有时无法知道哪一部分会先加载，如果采用上面的写法，第一个执行的部分有可能加载一个不存在的空对象
```
let module1 = (function(mod) {
    mod.m3 = function() {
        // 
        console.log('m3')
    }
    return mod
})(module1 || {})
```
自己实现一个简易的commonjs
```
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
```


