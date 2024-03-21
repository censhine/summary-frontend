import { A } from './moduleA.js'

const a = new A();
// console.log(a[key])

const symbols = Object.getOwnPropertySymbols(a)
console.log(symbols)
console.log(a[symbols[0]], a[symbols[1]])