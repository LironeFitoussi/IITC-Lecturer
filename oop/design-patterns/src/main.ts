import "./style.css";
import typescriptLogo from "./typescript.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>

    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Hello OOP</h1>
  </div>
`;

/**
 * What Are SOLID Principles? 
 * 
  SOLID principles are guidelines for writing maintainable and scalable object-oriented code.
  They help reduce code complexity, improve reusability, and enhance readability.
  Acronym:
  S: Single Responsibility Principle
  O: Open/Closed Principle
  L: Liskov Substitution Principle
  I: Interface Segregation Principle
  D: Dependency Inversion Principle
 */

/**
 * Why SOLID? 
 * 
  Avoid tightly coupled code. !!!
  Simplify adding new features.
  Reduce bugs and unexpected behavior.
  Code becomes easier to understand, test, and maintain.
 */
