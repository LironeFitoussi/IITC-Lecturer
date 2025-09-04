// Liskov Substitution Principle (LSP)
// Definition: Subtypes must be substitutable for their base types.

// Bird is the base class, and we use polymorphism to define specific behavior for different birds.
class Bird {
  move(): string {
    return "I can move!";
  }
}

class Dror extends Bird {
  move(): string {
    return "I can fly!";
  }
}

class Penguin extends Bird {
  move(): string {
    return "I can swim!";
  }
}

// Usage
const birds: Bird[] = [new Bird(), new Dror(), new Penguin()];
birds.forEach((bird) => console.log(bird.move()));
// Outputs: "I can move!", "I can fly!", "I can swim!"
