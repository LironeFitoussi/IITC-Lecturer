import { Callback, constructTypeErrorMessage } from "../arrays";

export class MyForEach {}

// Implementation of myForEach
Array.prototype.myForEach = function <T>(
  this: T[],
  callback: Callback<T, void>
): void {
  if (typeof callback !== "function") {
    throw new TypeError(constructTypeErrorMessage(callback));
  }

  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

console.log("<---FOREACH--->");

[1, 2, "3"].myForEach((num, index, array) => {
  console.log({ num, index, array });
});
