import { Callback, constructTypeErrorMessage } from "../arrays";

export class MyMap {}

// Implementation of myMap
Array.prototype.myMap = function <T, U>(
  this: T[],
  callback: Callback<T, U>
): U[] {
  if (typeof callback !== "function") {
    throw new TypeError(constructTypeErrorMessage(callback));
  }

  const result: U[] = [];

  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }

  return result;
};

console.log("<---MAP--->");

console.log(
  [1, 2, 3].myMap((num, index, array) => {
    return num * 2;
  })
);

console.log(
  [1, 2, 3].myMap((num, index, array) => {
    return String(num);
  })
);

console.log(
  [1, 2, 3, 4, 5].myMap((num, index, array) => {
    if (num > 3) {
      return String(num);
    }
    return num;
  })
);
