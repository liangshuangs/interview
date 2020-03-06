// 多维数组转一维数组
const flatten = (arr) => {
    let len = arr.length
    if (len === 0) return arr
    let resArr = []
    for (let i = 0; i < len; i++) {
        if (checkType('Array', arr[i])) {
            resArr = resArr.concat(flatten(arr[i]))
        } else {
            resArr.push(arr[i])
        }
    }
    return resArr
}
// 数据类型检查
const checkType = (type, obj) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
}
// 数组去重
removeDuplicate = (arr) => {
    let len = arr.length
    if (len === 0) return
    let duplicate = []
    let res = arr.filter((item, index) => {
        return arr.indexOf(item) === index
    })
    return res
}
// 单词的首字母转大写，其他是小写
const toUpperCaseword = (str) => {
    if (str === '') return str
    str = str.toLowerCase()
    let reg = /\b(\w)/g
    return str.replace(reg, function (m) {
        return m.toUpperCase()
    })
}
// 节流 使得一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数
const throttle = (fn, delay) => {
    let timer = null
    let preTime = 0
    let _this = this
    let startTime = new Date();
    if (startTime - preTime <= delay) {
        fn.apply(_this, arguments)
    } else {
        clearTimeout(timer)
        timer = null
        timer = setTimeout(function () {
            fn.apply(_this, arguments)
        }, delay)
    }
}
// 防抖 当持续触发scroll事件时，事件处理函数handle只在停止滚动1000毫秒之后才会调用一次，也就是说在持续触发scroll事件的过程中，事件处理函数handle一直没有执行
const debounce = (fn, delay) => {
    let timer = null
    let _this = this
    return function () {
        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            fn.apply(_this, arguments)
        }, delay)
    }
}
// 千位表示法
const thousandNumber = (num) => {
    let reg = /(\d)(?=(\d{3})+$)/g
    return num.replace(reg,',')

}
// 驼峰
const getCamelCase = (str) => {
    let reg = /(-)(\w)/g
    return str.replace(reg, function(res,$1,$2) {
        return $2.toUpperCase()
    })
}
//统计字符串中出现最多的字母
const getChar = (str) => {
    if(str === '') {
        return
    }
    str = str.split('').sort().join('')
    let reg = /(\w)\1+/g
    let res = str.match(reg)
    if(res) {
        let handleRes = res.sort(function(a,b) {return a.length - b.length})
        return {
            value: handleRes[handleRes.length - 1],
            key: handleRes[handleRes.length - 1].length
        }
    }
}
// 字符串去重，并找出重复的字符和个数
const findStr = (str) => {
    if(!str) return
    let hash = []
    let newStr = ''
    for(let i = 0 ; i < str.length; i++) {
        if(str.indexOf(str[i]) === i) {
            newStr += str[i]
        }else {
            if(hash[str[i]] === undefined) {
                hash[str[i]] = 1
            }else {
                hash[str[i]]++
            }
        }
    }
    return {hash:hash,new: newStr}
}
// 深拷贝
const deepClone = (obj) => {
    if(!obj) return
    let res = checkType('Array',obj) ? [] : {}
    for(let i in obj) {
       if(typeof obj[i] === 'object') {
         res[i] = deepClone(obj[i])
       }else {
        res[i] = obj[i]
       }
    }
    return res
}
// 用正则实现trim() 清除字符串两端空格
const myTrim = (str) => {
    if(!str) return
    let reg = /(^\s*)|(\s*$)/g
    return str.replace(reg, '')
}
// 实现一个promise.all()
const promiseAll = (promises) => {
    return new Promise(function(resolve, reject) {
     if(!Array.isArray(promises)) {
         throw new TypeError('promises must be Array')
     }else {
         let count = 0;
         let len = promises.length
         let resolveValue = new Array(len)
         for(let i = 0; i < len; i++) {
             Promise.resolve(promises[i]).then(function(value) {
                 count++
                 resolveValue[i] = value
                 if(len === count) {
                     return resolve(resolveValue)
                 }
             },function(err) {
                 return reject(err)
             })
         }
     }
    })
 }
 // 数字转字符 对应26个字符
 const numMapString = (str, mpa) => {
    let num = str | 0
    let result = ''
    while(true) {
        if(num <= 0) {
            break
        }
        let mod = num % 26
        if(mod >0) {
            result += mpa[mod - 1]
        }
        if(mod === 0) {
            result += 'z'
        }
        num = parseInt(num / 26)
        

    }
    return result.split('').reverse().join('')
}
// 字符映射数字
const StringMapNum = (str, map) => {
    if(!str) return 
    let reg = /([a-zA-Z]+)(\d+)/g
    let res = reg.exec(str)
    let col = res[1].toLowerCase()
    let row = res[2]
    let timer = 1;
    let colNum = 0
    let len = col.length
    for(let i = len -1; i >=0; i--) {
        let mapValue = map.findIndex(item => item === col[i])
        mapValue += 1
        colNum += timer * mapValue
        timer = timer * 26
    }
    return [colNum, row | 0]
}
const  clearRepetReduce = (arr) => {
    let result = []
    arr.reduce(function(pre, value) {
        
        if(pre !== value) {
            result.push(value)
        }
        return value
    },-1)
    return result
}
// 按照规定的规律进行移动
const moveFn = (str) => {
    if(!str) return
    let arr = str.split(';')
    let reg = /^([ASWD])(\d{1,2})$/
    let subReg = /[ASWD]/
    let site = [0, 0]
    let handleArr = []
    for(let i = 0; i< arr.length; i++) {
        if(reg.test(arr[i])) {
            let opt = RegExp.$1;
            let val = RegExp.$2;
            site = oprationFn(opt, val, site)
        }
    }
    return site
}
const oprationFn = (op, val, res) => {
    let opration = {
        A: [0,'-'],
        D: [0, '+'],
        W: [1, '+'],
        S: [1, '-']
    }
    let work = opration[op]
    res[work[0]] = work[1] === '-' ? (res[work[0]] - val) : (res[work[0]] - val)
    return res
}
class MyPromise {
    callbacked = []; // 回调方法
    state = 'pending'; // 状态
    value = null; // 值
    constructor(fn) {
        fn(this._resove.bind(this),this._reject.bind(this))
    }
    then(fulled, failed) {
        return new MyPromise((reslove, reject) => {
            this._handleCallbacked({
                fulled:fulled || null,
                failed:failed || null,
                reslove:reslove,
                reject:reject
            })
        }) 
    }
    _handleCallbacked(callbacked) {
        if(this.state === 'pending') {
            this.callbacked.push(callbacked)
            return
        }
        let cb = this.state === 'resloved' ? callbacked.fulled : callbacked.failed
        let nextCb = this.state === 'resloved' ? callbacked.reslove : callbacked.reject
        if(!cb) {
            nextCb(this.value)
            return 
        }
        try {
            let res = cb(this.value)
            nextCb(res)
        } catch(err) {
            res = err
            cb =  callbacked.reject
        }
        
    }
    _resove(value) {
        this.state = 'resloved'
        this.value = value;
        this.callbacked.map(callbacked => this._handleCallbacked(callbacked))
    }
    _reject(value) {
        this.state = 'rejected'
        this.value = value;
        this.callbacked.map(callbacked => this._handleCallbacked(callbacked))
    }
}
const fetch = (url) => {
    return new MyPromise(reslove => {
        console.log(url,'url')
        setTimeout(() => {
            reslove(url)
        }, 5000)
    })

}
// 控制并发
const handleSend = (urls, max) => {
    // 循环发送，当发送成功一条，则加入一条到发送的队列中
    return new Promise(reslove => {
        let len = urls.length
        let idx = 0
        let count = 0
        const start = () => {
            while (idx < len && max > 0) {
                let randm = Math.random()
                console.log(randm, ', ', max, 'init randm1')
                fetch(urls[idx]).then(res => {
                    console.log('res',res)
                    console.log(randm, ', ', max, ' fetching randm2')
                    count++
                    max++
                    console.log(max,'max')
                    start()
                    if(count === len) {
                        return reslove(res)
                    }
                })
                console.log(randm,', ', max , 'end randm1')
                idx++
                max--
            }
        }
        start()
    })
}
// 封装一个请求方法，可以设置最大的请求次数，请求成功则不在请求，请求失败则请求至最大次数为止
const handleMaxFech = (url, max) => {
    return fetch(url).then(res => {
        console.log('成功拉')
    }).catch(err => {
        if(max <= 1) {
            console.log('请求超时')
        }else{
            return handleFech(url, --max)
        }
    })
}
// 给定一个整数无序数组和变量sum，如果存在数组中任意两项和使等于sum的值，则返回true。否则,返回false。例如，数组[3,5,1,4]和sum = 9，函数应该返回true，因为4 + 5 = 9。
const findSum = (arr, val) => {
    let set = new Set()
    set.add((val-arr[0]))
    for(let i=1; i< arr.length; i++) {
        reval = val - arr[i]
        if(set.has(arr[i])) {
            return true
        }else{
            set.add(reval) 
        }
    }
    return false
}
module.export = {
    flatten,
    checkType,
    toUpperCaseword,
    debounce,
    thousandNumber,
    getCamelCase,
    getChar,
    deepClone,
    myTrim,
    findStr,
    promiseAll,
    numMapString,
    StringMapNum,
    clearRepetReduce,
    moveFn,
    MyPromise,
    handleSend,
    handleMaxFech,
    findSum
}