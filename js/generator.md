# generator 生成器
能够进行遍历的都是具有Iterator接口的，array,set,map,类数组,arguments都具有Iterator接口，其实就是具有Symbol.itrator属性，Symbol.itrator ＝ 遍历器生成函数，调用该函数会返回一个遍历器对象
由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象的Symbol.itrator，从而使对象具有Iterator接口
```
let myIterable = {}
myIterable[Symbol.iterator] = function * () {
    yield 1;
    yield 2;
    yield 3;
}
console.log([...myIterable]) // [1,2,3]
```
## for...of 循环
for...of 循环可以自动遍历generator函数运行时生成的Iterator，且此时不再需要调用next方法
```
function* foo1() {
    yield 1;
    yield 2;
    yield 3;
    return true 

}
for(let f of foo1()) {
    console.log(f) // 1,2,3
}
```
## generator 是使用
1. 切换状态
```
let f = change ()
function  clock() {
    f.next()
    
}
function *change () {
    while(true) {
        console.log('tick')
        yield
        console.log('tock')
        yield
    }
}
```
2. 修改对象，使对象可以遍历
```
function * iterEnteres(obj) {
    let keys = Object.keys(obj)
    for(let i =0; i < keys.length; i++) {
        let key = keys[i]
        yield [key,obj[key]]
    }
}
for(let f of iterEnteres({foo:1,fdd: 2})) {
    console.log(f) // ['foo',1] ['fdd',2]
}
```
