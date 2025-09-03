// Liskov Substitution Principle (LSP)
// Definition: Subtypes must be substitutable for their base types.

// Violates LSP because not all Birds can fly, but the Bird class assumes they can.
class Bird {
  fly(): string {
    return "I can fly!";
  }
}

class Penguin extends Bird {
  // This causes confusion as Penguins cannot fly, breaking the expected behavior.
  fly(): string {
    throw new Error("I cannot fly!");
  }
}

// Usage
const bird = new Bird();
console.log(bird.fly()); // I can fly!

const penguin = new Penguin();
console.log(penguin.fly()); // new Error("I cannot fly!");
