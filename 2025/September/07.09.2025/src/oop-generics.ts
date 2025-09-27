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

// class NumberUtils {
//     /**
//      * @param nums array of nums
//      * @decription this gets an array of numbers
//      * @returns boolean
//     */
//     static allPositive(nums: number[]): boolean {
//         for (let n of nums) {
//             if ( n <= 0) return false
//         }
//         return true;
//     }
// }

// console.log(NumberUtils.allPositive([1, 5, -6]));


// ---------------------------
// class Utils {
//     static allPass<T>(arr: T[], cb: (item: T) => boolean): boolean{
//         for ( let el of arr) {
//             if (!cb(el)) return false
//         }
//         return true
//     }
// }

// console.log(Utils.allPass<number>([1,2,3], n => n > 0));
// console.log(Utils.allPass<string>(['a', 'b', 'c'], s => s.length >= 1));

interface User {
    name: string,
    age: number
}

// const users: User[] = [
//     { name: "Alice", age: 28 },
//     { name: "Bob", age: 34 },
//     { name: "Charlie", age: 17 },
//     { name: "Diana", age: 30 }
// ]

// console.log(Utils.allPass<User>(users, u => u.age >= 18));

// -----------------------------

// (Array.prototype as any).getFirstIndex = function () {
//     console.log(this[1]);   
// }

// const arr1 = [5, 8, 20]

// arr1.getFirstIndex()

// =================================
type Callback<T> = (item: T, index: number, arr: T[]) => unknown;
declare global {
    interface Array<T> {
        myEvery(cb: Callback<T>): boolean;
    }
}

(Array.prototype as any).myEvery = function <T>(
    this: T[],
    cb: Callback<T>
): boolean {
    // Base Validation for CB
    if (typeof cb !== 'function') {
        throw new TypeError('callbakc must be a valid funciton')
    }

    for (let i = 0; i < this.length; i++) {
        const result = cb(this[i], i, this)
        if (!result) {
            return !!result
        }
    }
    return true
}

const arr2 = [1, -3, 5]
console.log(arr2.myEvery((x) => x > 0));

const users: User[] = [
    { name: "Alice", age: 28 },
    { name: "Bob", age: 34 },
    { name: "Charlie", age: 17 },
    { name: "Diana", age: 30 }
]

console.log(users.every((x) => x.age > 18));