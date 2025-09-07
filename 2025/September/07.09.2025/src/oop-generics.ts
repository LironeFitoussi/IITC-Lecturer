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

// interface User {
//     name: string,
//     age: number
// }

// const users: User[] = [
//     { name: "Alice", age: 28 },
//     { name: "Bob", age: 34 },
//     { name: "Charlie", age: 17 },
//     { name: "Diana", age: 30 }
// ]

// console.log(Utils.allPass<User>(users, u => u.age >= 18));

// -----------------------------