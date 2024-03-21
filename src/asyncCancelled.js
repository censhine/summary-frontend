function getCatgory(id) {
    return fetch('http://localhost:3000/category')
}
function m1() {
    return getCatgory(1)
}

function main() {
    const result =  m1()
    console.log(result)
}

// 消除异步方法的传染性
function removeAsync(func) {
    let cache = []
    let i = 0
    let _originFetch = window.fetch
    // 改变fetch方法逻辑
    window.fetch = (...args)=>{
        // 获取请求缓存
        if(cache[i]) {
            // 状态完成 返回缓存数据
            if(cache[i].status == 'fulfilled') {
                return cache[i].data
            }
            // 状态拒绝 抛出错误
            else if(cache[i].status == 'rejected'){
                throw cache[i].err
            }
        }
        // 缓存的对象数据
        const result = {
            status: 'pending',
            data: null,
            err: null
        }
        cache[i++] = result
        // 发送请求
        const _promise = _originFetch(...args)
        .then(res=>res.json())
        .then((res)=>{
            result.status = 'fulfilled'
            result.data = res
        }, (err)=>{
            result.status = 'rejected'
            result.err = err
        })
        // 抛出错误，触发报错（promise）, 让函数重新执行 ======> 非常关键
        throw _promise
    }
    // 捕获异常错误 触发重新执行
    try {
        func()
    } catch(err) {
        // 捕获到promise错误后重新运行函数
       if(err instanceof Promise) {
            // 重新运行函数
            const reRun = () => {
                i = 0;
                func()
            }
            err.then(reRun, reRun) 
       }
    }
}

removeAsync(main)
