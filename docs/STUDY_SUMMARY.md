## 消除异步函数的传染性

### `要求：` 将下面所有的异步函数的 `async`、`await`、`then`等异步的副作用修饰符全部消除，并正确返回数据
```javascript
async function getCatgory() {
    return fetch('http://0.0.0.0:3000/category').then(res => res.json())
}

async function m1() {
    const result = await getCatgory()
    return result
}

async function m2() {
    const result = await m1()
    return result
}

async function main() {
    const result = await m2()
    console.log(result)
}
```

### 分析： 
- 这道题要能独立解答出来，年薪至少在30万以上，如果年薪不足30万，那随便跳。因为如果你能独立解答出这道题，其他方面不知道，但至少说明你的编程能力已经到达高级资深水准了，甚至可以独立开发框架。
而且解这道题，不需要你用到任何的新知识，就用最基础的代码就能解决。这是一个大厂内部晋升遇到的一道考题。

- 从表面上看来，一个节点发生了异步，这个节点上所有的调用链全部得异步，你可能觉得这没啥，只是有点恶心而已。但是如果你处于一个函数式编程环境里面，这个问题就严重了，本来这些函数式好好的纯函数
结果全部变成了副作用，都异步了。这道题就是要你消除掉这些异步副作用，变成一个纯函数的同步调用方式, 如下:

```javascript
function getCatgory() {
    return fetch('http://0.0.0.0:3000/category')
}

function m1() {
    const result = getCatgory()
    return result
}

function m2() {
    const result = m1()
    return result
}

function main() {
    const result = m2()
    console.log(result)
}
```

- 看上去简直是天方夜谈是吧，运行看下，打印结果只能是`Promise<pending>`，还能获取到正确结果，只能干捉急？
- 那怎么弄呢，这就是属于完全下不了手的问题，看上去就莫名其妙，你可能觉得你在开发中没怎么遇到这类问题，
但是这一类下不了手的问题，在开发框架、开发公用库的时候比比皆是，没有商量的余地，必须要解决。
- 整个问题发生的根源在哪里呢？在第一个函数里面`fetch`方法，不管你调用了多少次，是这个节点发生了异步，造成了一系列的连锁反应，所以我们必须在这里做文章，其他地方动了也无济于事，是吧。
- 由于我们现在代码全部变同步了，这个`fetch`函数就必须立即要返回结果，它能立即返回结果吗？返回不了啊，远程调用请求需要时间，但是我们要求它必须要返回结果，那怎么办？那报错呗！
- 只有报错这一条路，如果说你能想到这一点，以这个点为入口去深挖，一条路走到黑，那么恭喜你走对了！
- 就是报错！我们可以用这种设计来搞定这类问题
- 首先函授开始，然后调用了`fetch`，但是这一次我不等你了，我等不了你，因为你是异步的，我是同步的函数，你爱怎么网络通信怎么去网络通信
- 反正我不等你怎么办，引发报错，既然我不知道怎么返回我就报错，报错不是等你立即返回，因为同步函数必须要让他马上结束
- 然后，网络请求在后台默默地进行，拿到了网络数据，但是这个函数早就结束了啊，那我就把这个数据缓存到某个地方，当做完这件事之后，我重新去调用这个函数再执行一遍，也就是这个函数会执行两次。
- 这就要保证这个函数没有副作用，当然这在函数式编程里面是不成什么问题的，如果这一块有困难的话，那就要好好的打好基础，基础不牢，地动山摇，你学啥东西最多只能学个皮毛，甚至完全学不会，
而且越学越困难，每一次学习成本极高，别人花一两天就学完、学透学精通的知识，你可能一年都搞不定，这些都是基础有问题，基础决定了你的天花板，能力的天花板，学习的天花板，薪资的天花板。
- 那么当第二次执行这个函数的时候，是不是之前已经缓存了返回数据？于是在调用这个`fetch`的时候，就直接把这个缓存的数据交付出去，然后函数继续运行，最后就结束了
- 这既是新的模式下的整个执行过程，这个模式已经在现实中使用了，沿着这样的思路，那我们如何来改造呢？
- 首先我们不能对这些函数有侵入性，那我们就在终点上做文章，不是要运行`main`函数，那我把`main`函数放到里面来运行：

```javascript
function getCatgory() {
    return fetch('http://0.0.0.0:3000/category')
}

function m1() {
    const result = getCatgory()
    return result
}

function m2() {
    const result = m1()
    return result
}

function main() {
    const result =  m2()
    console.log(result)
}

// 定义一个方法`removeAsync`：
function removeAsync(func) {
    // 缓存
    let cache = []
    // 调用次数
    let i = 0
    // 保存原始fetch方法
    let _originFetch = window.fetch
    // 改变fetch方法的逻辑
    window.fetch = (...args)=>{
        // 获取请求缓存
        if(cache[i]) {
            // 状态完成 直接返回缓存数据
            if(cache[i].status == 'fulfilled') {
                return cache[i].data
            }
            // 状态拒绝 抛出错误
            else if(cache[i].status == 'rejected'){
                throw cache[i].err
            }
        }
        // 定义初始状态下缓存的对象数据
        const result = {
            status: 'pending',
            data: null,
            err: null
        }
        // 缓存每次运行的返回结果数据
        cache[i++] = result
        // 发送网络请求，并用_promise句柄存下
        const _promise = _originFetch(...args)
        .then(res => res.json())
        .then((res) => {
            // 缓存状态完成的数据
            result.status = 'fulfilled'
            result.data = res
        }, (err) => {
            // 缓存状态拒绝的错误数据
            result.status = 'rejected'
            result.err = err
        })
        // 抛出错误，触发promise报错, 让函数重新执行 ======> ***非常关键***
        throw _promise
    }
    // 捕获异常错误，触发重新执行
    try {
        func()
    } 
    catch(err) 
    {
        // 捕获到promise错误后重新运行函数
       if(err instanceof Promise) {
            // 定义重新运行函数
            const reRun = () => {
                // 重置计数
                i = 0;
                // 重新运行
                func()
            }
            // 正常返回数据和拒绝时均重新执行函数
            err.then(reRun, reRun) 
       }
    }
}
// 这样，调用后便可执行返回数据，封装后便消除了异步的传染性
removeAsync(main)
```