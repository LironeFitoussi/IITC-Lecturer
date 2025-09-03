import { Callback, constructTypeErrorMessage } from "../arrays";

export class MyEvery {}

Array.prototype.myEvery = function <T>(
  this: T[],
  callback: Callback<T, unknown>
) {
  if (typeof callback !== "function") {
    throw new TypeError(constructTypeErrorMessage(callback));
  }

  for (let i = 0; i < this.length; i++) {
    const value = callback(this[i], i, this);
    if (!value) {
      return !!value;
    }
  }

  return true;
};

console.log("<---EVERY--->");

console.log(
  [1, 2, 3].myEvery((num, _index, _arr) => {
    return num + 2;
  })
);

console.log(
  [-2, -2].myEvery((num, _index, _arr) => {
    return num + 2;
  })
);

console.log(
  [-1, -2].myEvery((num, _index, _arr) => {
    return num + 2;
  })
);

console.log(
  [-1, -1].myEvery((num, _index, _arr) => {
    return num + 2;
  })
);
