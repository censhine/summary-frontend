const obj = {
    a: 1,
    b: 2,
    run() {
        console.log('run')
    },
    get d() {
        console.log('d')
    }
}
Reflect.set(obj, 'c', 1)

Reflect.get(obj, 'd')

console.log(obj)