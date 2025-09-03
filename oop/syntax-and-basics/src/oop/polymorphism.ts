// Base class representing a general animal
export class Animal {
  makeSound() {
    console.log("Some generic animal sound...");
  }
}

// Derived class representing a Dog
class Dog extends Animal {
  makeSound() {
    console.log("Woof! Woof!");
  }
}

// Derived class representing a Cat
class Cat extends Animal {
  makeSound() {
    console.log("Meow!");
  }
}

// Array of different animal objects (Dog and Cat)
const someAnimal = new Animal();
const dog = new Dog();
const cat = new Cat();
const animals: Animal[] = [someAnimal, dog, cat];

// Iterate through the array and call the makeSound method
// Polymorphism ensures the correct method is called for each object
animals.forEach((animal) => animal.makeSound());
// Output:
// Some generic animal sound...
// Woof! Woof!
// Meow!

/////////////////////////////////////////////////////////////////

interface Printer {
  print(value: string): void;
}

class Logger implements Printer {
  print(value: string) {
    console.log(value);
  }
}

class Alerter implements Printer {
  print(value: string) {
    alert(value);
  }
}

const logger = new Logger();
const alerter = new Alerter();

const priters: Printer[] = [];
priters.push(logger);
priters.push(alerter);

priters.forEach((priter) => priter.print("baba"));
