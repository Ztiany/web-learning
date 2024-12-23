/*
=================================================================
                                            单例模式
=================================================================
*/

// 静态方法版
class Storage1 {
    static getInstance() {
        // 判断是否已经new过1个实例
        if (!Storage.instance) {
            // 若这个唯一的实例不存在，那么先创建它
            Storage.instance = new Storage()
        }
        // 如果这个唯一的实例已经存在，则直接返回
        return Storage.instance
    }

    getItem(key) {
        return localStorage.getItem(key)
    }

    setItem(key, value) {
        return localStorage.setItem(key, value)
    }
}

// 先实现一个基础的 StorageBase 类，把 getItem 和 setItem 方法放在它的原型链上
function StorageBase() {
}

StorageBase.prototype.getItem = function (key) {
    return localStorage.getItem(key)
}

StorageBase.prototype.setItem = function (key, value) {
    return localStorage.setItem(key, value)
}

// 以闭包的形式创建一个引用自由变量的构造函数
const Storage2 = (function () {
    let instance = null
    return function () {
        // 判断自由变量是否为null
        if (!instance) {
            // 如果为null则new出唯一实例
            instance = new StorageBase()
        }
        return instance
    }
})()