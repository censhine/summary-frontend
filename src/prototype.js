
function test() {
    const x = Math.random()
    if(x > 0.5) {
        return new Object()
    }else{
        return new Array()
    }
}

const t = new test()

console.log(test.prototype.constructor == test)
console.log(test.prototype == t.__proto__)

console.log(t.__proto__.constructor.name)


console.log(typeof Object, typeof Function, typeof Array)


console.log(Array.__proto__)


