// 使用模块化私有
const key = Symbol('key')
const key2 = Symbol('key2')

export class A {
    [key] = 1;
    [key2] = 2;
    man() {
        console.log(this[key], this[key2])
    }
}