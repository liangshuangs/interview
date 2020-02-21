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
module.export = {
    flatten,
    checkType,
    toUpperCaseword,
    debounce,
    thousandNumber,
    getCamelCase,
    getChar,
    deepClone,
    myTrim
}