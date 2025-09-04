// 4. Factory Pattern
// Define an interface for creating an object but let subclasses alter the type of objects that will be created.

interface Shape {
  draw(): void; // Abstraction
}

class Circle implements Shape {
  draw(): void {
    console.log("Drawing a Circle."); // Polymorphism
  }
}

class Square implements Shape {
  draw(): void {
    console.log("Drawing a Square."); // Polymorphism
  }
}

class ShapeFactory {
  // Creates a shape based on the type
  public static createShape(type: "circle" | "square" | "triangle"): Shape {
    // more logic
    switch (type) {
      case "circle":
        type;
        return new Circle(); // Polymorphism - Circle implements Shape
      case "square":
        type;
        return new Square(); // Polymorphism - Square implements Shape
      case "triangle":
        type;
        return new Square(); // Polymorphism - Square implements Shape
      default:
        const _unreacable: never = type;
        throw new Error("Invalid shape type");
    }
  }
}

// Client Code:
const circle = ShapeFactory.createShape("circle");
circle.draw(); // Output: Drawing a Circle.
const square = ShapeFactory.createShape("square");
square.draw(); // Output: Drawing a Square.

// SOLID Principles:
// - Single Responsibility Principle (SRP): The factory is responsible only for creating objects.

// - Polymorphism: Different shapes implement their own drawing logic.
