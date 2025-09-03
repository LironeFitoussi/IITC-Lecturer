import { MyEvery } from "./methods/every";
import { MyFilter } from "./methods/filter";
import { MyForEach } from "./methods/for-each";
import { MyMap } from "./methods/map";
import { MySome } from "./methods/some";

export class Arrays {}
// MyForEach;
// MyMap;
// MyFilter;
// MySome;
MyEvery;

declare global {
  interface Array<T> {
    myForEach(callback: Callback<T, void>): void;
    myMap<U>(callback: Callback<T, U>): U[];
    myFilter<S extends T>(
      callback: (item: T, index: number, array: T[]) => item is S
    ): S[];
    myFilter(callback: Callback<T, unknown>): T[];
    mySome(callback: Callback<T, unknown>): boolean;
    myEvery(callback: Callback<T, unknown>): boolean;
  }
}

export type Callback<T, R> = (item: T, index: number, array: T[]) => R;

export function constructTypeErrorMessage(value: unknown) {
  if (value === undefined) {
    return `${value} is not a function`;
  }
  if (value === null) {
    return `${typeof value} ${value} is not a function`;
  }
  if (typeof value === "string") {
    return `${typeof value} "${value}" is not a function`;
  }
  if (typeof value === "number") {
    return `${typeof value} ${value} is not a function`;
  }

  return `${typeof value} is not a function`;
}
