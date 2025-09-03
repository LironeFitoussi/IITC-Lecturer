import { Callback, constructTypeErrorMessage } from "../arrays";

export class MySome {}

Array.prototype.mySome = function <T>(
  this: T[],
  callback: Callback<T, unknown>
) {
  if (typeof callback !== "function") {
    throw new TypeError(constructTypeErrorMessage(callback));
  }

  for (let i = 0; i < this.length; i++) {
    const value = callback(this[i], i, this);
    if (value) {
      return !!value;
    }
  }

  return false;
};

console.log("<---SOME--->");

console.log(
  [1, 2, 3].mySome((num, index, arr) => {
    return num + 2;
  })
);

console.log(
  [-2, -2].mySome((num, index, arr) => {
    return num + 2;
  })
);
