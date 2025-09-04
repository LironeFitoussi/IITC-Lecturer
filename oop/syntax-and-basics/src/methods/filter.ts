import { Callback, constructTypeErrorMessage } from "../arrays";

export class MyFilter {}

// Implementation of myFilter
Array.prototype.myFilter = function <T, S extends T>(
  this: T[],
  callback:
    | ((item: T, index: number, array: T[]) => item is S)
    | Callback<T, unknown>
): T[] | S[] {
  if (typeof callback !== "function") {
    throw new TypeError(constructTypeErrorMessage(callback));
  }

  const result: T[] = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

console.log("<---FILTER--->");

console.log(
  [1, 2, 3].filter((item, index, array) => {
    return item > 2;
  })
);

console.log(
  [1, 2, 3].myFilter((item, index, array) => {
    return item > 2;
  })
);

console.log(
  [1, "2", 3, true].myFilter((item, index) => {
    return typeof item === "number";
  })
);

class Baba {
  x() {
    return "hi";
  }
}

class Mama {
  y() {
    return 1;
  }
}

console.log(
  [new Baba(), new Mama()].myFilter((item, index) => {
    return "x" in item;
  })
);
