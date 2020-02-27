const fs = require('fs')
function thunk (fn) {
    return function() {
        let _this = this
        let args = new Array(arguments.length)
        for(let i = 0; i < args.length; i++) {
            args[i] =arguments[i]
        }
        console.log(args)
        return function (next) {
            fn('./test.json',function(err, data ) {
                console.log(data,'data')
                next(err,data)
            })
        }   
    }
}
let readFileThunk = thunk(fs.readFile)
function run(f) {
    let gen = f(); // generator 函数
    function next(err, data) {
        let result = gen.next(data);
        if(result.done) return
        result.value(next)
    }
    next()
}
function * read () {
    yield readFileThunk('./test.json')
    yield readFileThunk('./test2.json')
}
let res = run(read)
function * test() {
    yield setTimeout(() => {
        console.log('4444')
    }, 4000);
}
function spawn(genF) {
    return new Promise(function(resolve, reject) {
      const gen = genF();
      function step(nextF) {
        let next;
        try {
          next = nextF();
        } catch(e) {
          return reject(e);
        }
        if(next.done) {
          return resolve(next.value);
        }
        Promise.resolve(next.value).then(function(v) {
          step(function() { return gen.next(v); });
        }, function(e) {
          step(function() { return gen.throw(e); });
        });
      }
      step(function() { return gen.next(undefined); });
    });
  }
function fn() {
    let res =  spawn(test)
    console.log(res,'res')
}
//let res = fn()
fn()

// fn().then(res => {
//     console.log(res)
// })