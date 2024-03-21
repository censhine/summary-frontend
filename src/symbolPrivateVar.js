// 使用symbol私有
const key = Symbol('key')

class A {
    [key] = 1;//动态属性变量
    man() {
        console.log(this[key])
    }
}
const b = new A();
console.log(b[key])