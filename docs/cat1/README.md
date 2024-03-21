# 常见面试题
## 说说浅拷贝和深拷贝
- 浅拷贝只复制对象的顶层属性，如果对象的属性值是一个引用类型（如数组或对象），则复制的是该引用的地址，而不是实际的数据。因此，浅拷贝后，新旧对象中的引用类型属性会指向同一个内存地址，修改其中一个对象会影响另一个对象。
- 深拷贝会递归地复制对象的所有层级，包括嵌套的引用类型。深拷贝后，新旧对象完全独立，修改其中一个对象不会影响另一个对象。
- 浅拷贝和深拷贝的主要区别在于如何处理引用类型数据。浅拷贝只复制引用地址，而深拷贝会递归地复制所有层级的数据

## 原型和原型链
- 原型和原型链是实现基于原型的继承和属性共享的重要概念。每个对象都有一个指向它的原型对象的链接，这个原型对象本身也是一个对象，它也有自己的原型，这样一层一层直到某个对象的原型为null，形成了一条原型链。

## 函数柯里化
- 柯里化是将一个多参数函数转换成一系列嵌套的一元函数的过程，它是高阶函数和闭包相结合的应用。柯里化可以视为一个函数，它接收一个函数A作为参数，运行后返回一个新的函数。这个新的函数能够处理函数A的剩余参数，先对参数进行收集，最后再进行计算。

## BOM和DOM
- BOM和DOM是JavaScript中非常重要的两个概念，它们分别代表浏览器对象模型（Browser Object Model）和文档对象模型（Document Object Model）。

## for in 和 for of
- for in和for of是JavaScript中的两种循环结构，它们都可以用于遍历数组或对象的属性
- for in循环用于遍历对象的属性，它通过访问对象的键（key）来获取属性
- for of循环用于遍历数组的元素，它通过迭代器（Iterator）来访问数组的元素

## 哪些地方不能用箭头函数
- 需要使用this的场景
- 构造函数
- 事件处理程序

## 创建一个对象的过程
- new创建一个空对象
- 将空对象的原型指向构造函数的原型
- 将空对象作为构造函数的上下文
- 对构造函数有返回值的处理、

## 闭包决解决了什么问题
- 读取函数内部的变量
- 让变量的值始终保存在内存中
此外，闭包还可以用于实现回调函数、实现装饰器、实现事件监听等。


## 防抖和节流

- 防抖：一定时间内没再触发事件，事件处理函数采会被执行一次
- 节流： 一定事件内只调用一次事件处理函数
- 两者都是为了限制触发事件频率较高的事件，在不影响效果的前提下，降低触发频率，减轻服务器压力，提升用户体验

## 怎么自定义一个事件

```javascript
// 创建一个新的自定义事件  
var myEvent = new Event('myCustomEvent');  
  
// 定义一个处理程序来处理这个事件  
function handleMyEvent(event) {  
  console.log('My custom event has been triggered!');  
}  

// 订阅这个事件  
window.addEventListener('myCustomEvent', handleMyEvent);  
  
// 触发这个事件  
window.dispatchEvent(myEvent);
```

## 怎么获取页面那个元素是最多的
```javascript
function getMostFrequentElement() {  
  // 获取页面中所有的元素  
  var allElements = document.getElementsByTagName('*');  
    
  // 创建一个空对象用于存储元素及其出现次数  
  var elementCount = {};  
    
  // 遍历所有元素，统计每个元素的出现次数  
  for (var i = 0; i < allElements.length; i++) {  
    var element = allElements[i];  
    var tagName = element.tagName;  
      
    // 将元素标签名作为键，出现次数作为值存入对象中  
    if (tagName in elementCount) {  
      elementCount[tagName]++;  
    } else {  
      elementCount[tagName] = 1;  
    }  
  }  
    
  // 根据出现次数对元素进行排序（从大到小）  
  var sortedTags = Object.entries(elementCount).sort((a, b) => b[1] - a[1]);  
    
  // 返回出现次数最多的元素标签名和出现次数  
  return sortedTags[0];  
}
```
## React的diff算法是怎么实现的
React的diff算法通过对DOM树进行分层比较、对不同类型的组件生成不同的树形结构、为同一层级的子节点提供唯一标识以及优化删除操作等策略，实现了高效的DOM更新，减少了不必要的计算和渲染，提高了应用程序的性能

## Redux的源码的理解

Redux是一个JavaScript状态容器，提供可预测化的状态管理方案。以下是关于Redux源码的简要理解：

Redux的核心概念包括单一数据源、状态是只读的、使用纯函数来执行修改。Redux将整个应用的state储存在一颗object tree中，并且这个object tree只存在于唯一一个store中。state是只读的，唯一改变state的方法是触发action。为了描述action如何改变state tree，需要编写reducers，即纯函数，接收旧的state和action，返回新的state。
Redux的源码主要包括store、action、reducer和provider等部分。store是Redux提供的createStore生成的，用于存储state和调度state的更新。action是一个普通对象，用于描述已发生的事件，其中包括type和payload属性。reducer是一个纯函数，用于处理state的更新。provider是全局注册的组件，在`<Provider>`内的组件都可拿到state。
Redux的代码风格以简洁和可读性为主，遵循函数式编程的思想。Redux的源码实现遵循单一职责原则，每个函数只做一件事情，避免了复杂的逻辑和副作用。同时，Redux的源码也使用了高阶函数和闭包等技术，实现了状态的封装和管理的功能。

## threejs性能优化有些方法
Three.js 是一款用于创建和显示 3D 图形的 JavaScript 库。优化 Three.js 性能的方法有很多，以下是一些常见的方法：

- 减少渲染的复杂性：通过减少场景中的对象数量、简化对象的几何形状、减少纹理和材质的数量，可以降低渲染的复杂性，提高性能。
- 使用低多边形模型：使用低多边形模型可以减少渲染的计算量，提高性能。可以通过简化几何形状、使用 LOD（Level of Detail）技术或使用纹理细节来减少多边形数量。
- 优化材质和纹理：优化材质和纹理可以降低内存使用和提高渲染性能。例如，使用纹理压缩、减少纹理分辨率、使用共享材质等。
- 使用 Web Worker：将计算密集型的任务（如物理模拟或碰撞检测）放在 Web Worker 中运行，可以避免阻塞主线程，提高性能。
- 使用请求动画帧（requestAnimationFrame）：使用 requestAnimationFrame 可以更精确地控制动画的帧率，减少不必要的渲染和计算，提高性能。
- 避免重复渲染：避免不必要的渲染可以显著提高性能。例如，通过只渲染可见的对象、使用深度剔除技术、利用 Three.js 的不可见渲染等技术。
- 使用缓存和数据结构：通过使用缓存和优化数据结构，可以减少重复计算和内存分配，提高性能。例如，使用对象池、预先分配内存等。
- 使用 GPU 加速：通过将一些计算任务交给 GPU 来处理，可以显著提高性能。例如，使用 WebGL 2.0 或 WebGPU 的特性，或者使用 Three.js 的内置 GPU 加速功能（如着色器）。
- 优化代码：优化代码也可以显著提高 Three.js 的性能。例如，避免使用昂贵的操作（如频繁的垃圾回收）、减少循环中的计算、使用适当的数据类型等。
- 使用性能分析工具：使用浏览器的性能分析工具（如 Chrome 的开发者工具）可以帮助您识别性能瓶颈，并采取相应的优化措施。


## 隐藏一个模型用什么属性

在Three.js中，可以使用模型的visible属性来隐藏或显示一个模型。将visible属性设置为false可以隐藏模型，而设置为true则可以显示模型。

## 用过哪些threejs的控制器
![Alt text](../public/assets/img/image-1.png)

## 微前端是怎么实现的
微前端是一种将单体前端应用拆分为多个独立的前端工程的技术架构。每个前端工程可以独立开发、测试和部署，最终由一个容器应用将拆分后的微前端工程组合为一个整体，面向用户提供服务。
微前端的具体实现方式包括基于接口协议、沙箱隔离、模块协议等。
在基于接口协议的方式中，子应用按照协议导出几个接口，主应用在运行过程中调用子应用导出的这几个接口。
基于沙箱隔离的方式中，主应用创建一个隔离环境，让子应用基本不用考虑自己是在什么环境下运营，按照普通的开发思路进行开发即可。
基于模块协议的方式中，主应用把子应用当作一个模块，和模块的使用方式无异

## 大数据两加载怎么优化
![Alt text](../public/assets/img/image.png)

## 前端项目中遇到什么困难，你是怎么解决的
![Alt text](../public/assets/img/image-2.png)