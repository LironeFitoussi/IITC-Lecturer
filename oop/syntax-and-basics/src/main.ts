import "./style.css";
import typescriptLogo from "./typescript.svg";
import { Person } from "./oop/basic-syntax";
import { Vehicle } from "./oop/inheritance";
import { Animal } from "./oop/polymorphism";
import { BankAccount } from "./oop/encapsulation";
import { LocalStorageSaver } from "./oop/abstraction";
import { Bird } from "./oop/inheritance-bad";
import { Arrays } from "./arrays";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>

    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Hello OOP</h1>
  </div>
`;

// Person;
// BankAccount;
// Vehicle;
// LocalStorageSaver;
// Animal;
// Bird;
Arrays;

// function wrapItemInArray<T>(item: T) {
//   return [item];
// }

// const stringArray = wrapItemInArray("1");
// stringArray[0].toUpperCase();
// // stringArray[0].toFixed();

// const numbersArray = wrapItemInArray(1);
// numbersArray[0].toFixed();
// // numbersArray[0].toUpperCase();

// const person = {
//   name: "omer",
//   age: 14,
//   isActive: true,
// };

// const value = getValueByKey(person, "age");
// console.log(value);

// function getValueByKey<TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) {
//   return obj[key];
// }

// function createArray<T>(): T[] {
//   return [];
// }

// const stringArr = createArray<string>();

// // any vs unkown vs never
// let myAny: any = 1;

// myAny.forEach();
// myAny.toFixed();
// myAny.omer = "mama";

// let myUnknown: unknown = 1;

// if (typeof myUnknown === "number") {
//   myUnknown.toFixed();
// }

// // if (myUnknown && typeof myUnknown === "object") {
// //   myUnknown.forEach(() => {});
// // }

// if (Array.isArray(myUnknown)) {
//   myUnknown.forEach(() => {});
// }

// if (myUnknown && typeof myUnknown === "object" && "omer" in myUnknown) {
//   myUnknown.omer = "mama";
// }

// myUnknown.omer = "mama";

// let myNever: never = undefined;

// if (typeof myNever === "string") {
//   myNever = "ssss";
// }

// myNever = undefined;
// myNever = null;

// type Plan = "standard" | "gold" | "platinum" | "baba";

// function checkUserPlan(plan: Plan, blogAmount: number) {
//   switch (plan) {
//     case "standard":
//       plan;
//       return blogAmount < 1;
//     case "gold":
//       plan;
//       return blogAmount < 3;
//     case "platinum":
//       plan;
//       return true;
//     default:
//       const _unreachable: never = plan;
//       throw new Error("unreachable!");
//   }
// }

// const res = checkUserPlan("standard", 1);
