# async
async await 其实内部的实现原理就是generator 和 promise结合
例子：
```
async function run (url) {
    let res = await requst(url) // 返回一个promise 对象
    if(res && res.code === 200) {
        console.log(res)
    }
}
```
等于
```
run()
function swan(fn) {
    return new Promise((resolve, reject) => {
        let gen = fn()
        function step(nextFn) {
            let next = nextFn()
            if(next.done) return resolve(next.value)
            step(funtcion(){return gen.next(next.value)})
        }
        step(function() {return gen.next(undefined)})

    })
}
function run () {
    return spwan(gen)
}
function * gen() {
    yield setTimeout(() => {return '3333'},3000)
}
```
## 按顺序完成异步操作
async function logInorder(urls) {
    for(let url of urls) {
        let res = await fetch(url)
        console.log(res)
    }
}
## 并发执行异步操作
functiion loginAll(urls) {
    urls.map(async (url) => {
        let res = await fetch(url)
    })
}