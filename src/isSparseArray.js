const arr = [1,2,3,4]
// 判断一个数组是否是稀疏数组
function isSparseArray(arr) {
    if(!Array.isArray(arr)){
        return false
    }
    for(let i=0;i<arr.length;i++) {
        if(!(i in arr)) return true
    }
    return false
}

console.log(isSparseArray(arr))