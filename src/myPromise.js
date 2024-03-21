
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

// 创建微队列任务
function runMicroTask(callback) {
    // node环境
    if(process && process.nextTick) {
        process.nextTick(callback)
    }
    // 浏览器环境
    else if(MutationObserver) {
        const dom = document.createElement('p')
        const ob = new MutationObserver(callback)
        ob.observe(dom, {
            childList: true
        })
        dom.innerHTML = '0'
    }
    else 
    {
        setTimeout(() => {
            callback()
        }, 0);
    }
}

class myPromise {
    _state
    _value
    constructor(excutor) {
        this._state = PENDING
        this._value = undefined
        try {
            excutor(this.#resolve.bind(this), this.#reject.bind(this))
        }
        catch(e) {
            this.#reject(e)
        }
    }
    /**
     * 标记当前任务完成
     * @param {*} data 
     */
    #resolve(data) {
        this.#setState(FULLFILLED, data)
    }
    /**
     * 标记当前任务失败
     * @param {*} reason 
     */
    #reject(reason) {
       this.#setState(REJECTED, reason)
    }
    #setState(state, value) {
        if(this._state !== PENDING){
            return
        }
        this._state = state
        this._value = value
    }
    then(callback) {
        if(this._state === FULLFILLED) {
            callback(this._value)
        }
    }
}

const mp = new myPromise((resolve, reject)=>{
    reject('error')
})

console.log(mp)

setTimeout(() => {
    console.log(1)
}, 0);
runMicroTask(()=>{
    console.log(2)
})
console.log(3)