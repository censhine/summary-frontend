// LRU 最久未使用的缓存置换算法 least recently used

class LRUcache {
    #map;
    #length;
    constructor(len) {
        this.#map = new Map()
        this.#length = len
    }
    has(key) {
        return this.#map.has(key)
    }
    get(key) {
        if(!this.#map.has(key)) return null
        const value = this.#map.get(key)
        this.#map.delete(key)
        this.#map.set(key, value)
        return value
    }
    set(key, value) {
        if(this.#map.has(key)) {
            this.#map.delete(key)
        }
        this.#map.set(key, value)
        if(this.#map.size > this.#length) {
            this.#map.delete(this.#map.keys().next().value)
        }
    }
}

const lru = new LRUcache(5)

lru.set('key1', {a: 1, b: 2, c: 3})
lru.set('key2', {a: 12, b: 3})
lru.set('key3', {a: 13, b: 3})
lru.set('key4', {a: 14, b: 3})
lru.set('key5', {a: 15, b: 3})
lru.set('key6', {a: 16, b: 3})

console.log(lru.has('key1'))
console.log(lru.has('key3'), lru.get('key4'))


const map = new Map()
map.set('x', 1)
map.set('y', 2)

console.log('map keys:', map.keys(), map.keys().next().value)
