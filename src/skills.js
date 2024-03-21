const str = 'abacefg1211111'

function countWord(str) {
    return [...str].reduce((prev, cur)=>{
        return ((prev[cur]++ || (prev[cur]=1)), prev)
    }, {})
}

function maxRequest(urls, maxNum) {
    if(urls.length === 0) {
        return Promise.resolve([])
    }
    return new Promise((resolve)=>{
        let index = 0;
        let result = [];
        let count = 0;
        async function _request() {
            const i = index;
            const url = urls[index]
            index++;
            try {
                const resp = await fetch(url).then(res=>res.json())
                result[i] = resp
            }
            catch(err) {
                result[i] = err
            }
            finally {
                count++;
                if(count <= maxNum) {
                    resolve(result)
                }
                if(index < urls.length) {
                    _request()
                }                
            }
            console.log(result)      
        }
        for(j=0; j < Math.min(maxNum, urls.length); j++) {
            _request()
        }
    })
}
