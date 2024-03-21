// weakmap私有属性
const privateFields = new WeakMap()

export class A {
    constructor() {
        privateFields.set(this, { key: 1})
    }
    man() {
        return privateFields.get(this).key
    }
}
