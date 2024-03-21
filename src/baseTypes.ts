const str:string = 'hello, typescript'
const num:number = 123
const bol:boolean = true
const udf:undefined = undefined
const nul:null = null
const symbol1:symbol = Symbol('key')

const obj:object = {
    a: 1,
    b: 2
}
const arr:[] = []
// const fun:Function = () => void
const date:Date = new Date()
const reg:RegExp = new RegExp(/^\d+/g)

function fun<T>(arg:T) {
    return arg
}

console.log(fun('123'))