// console.log('hello generics');

// class Store<T> {
//     private _items: T[] = [];
    
//     add(item: T) {
//         this._items.push(item)
//     }

//     get items () {
//         return this._items
//     }
// }

// const n = new Store<number>()
// n.add(10)
// n.add(20)

// const s = new Store<string>()
// s.add('baba')
// s.add('banana')

// console.log(s.items);
// console.log(n.items);


// -----------------------

class NumberUtils {
    /**
     * @param nums array of nums
     * @decription this gets an array of numbers
     * @returns boolean
    */
    static allPositive(nums: number[]): boolean {
        for (let n of nums) {
            if ( n <= 0) return false
        }
        return true;
    }
}

console.log(NumberUtils.allPositive([1, 5, -6]));
