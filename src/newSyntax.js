// ES2022新语法#号变量私有
class A {
    #key = 1
    man() {
        console.log(this.#key)
    }
}