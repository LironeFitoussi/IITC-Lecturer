// Base class to represent a general vehicle
export class Vehicle {
  brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }

  getBrand() {
    console.log(this.brand);
  }

  // Method to describe the vehicle's movement
  move() {
    console.log(`${this.brand} is moving.`);
  }
}

// Sub class that inherits from Vehicle
class Car extends Vehicle {
  model: string;

  constructor(brand: string, model: string) {
    super(brand); // Call the parent class constructor
    this.model = model;
  }

  // Override the move method to customize behavior for cars
  move() {
    console.log(`${this.brand} ${this.model} is driving on the road.`);
  }
}

class HybridCar extends Car {
  battery = 100;

  constructor(brand: string, model: string, battery: number) {
    super(brand, model);
    this.battery = battery;
  }
}

const bike = new Vehicle("Yamaha");
// bike.move(); // Output: Yamaha is moving.
// bike.getBrand(); // Output: Yamaha.

const tesla = new Car("Tesla", "Model S");
// tesla.move(); // Output: Tesla Model S is driving on the road.
// tesla.getBrand(); // Output: Tesla.

// console.log(bike instanceof Vehicle);
// console.log(tesla instanceof Car);
// console.log(tesla instanceof Vehicle);

// console.log(bike);
// console.log(tesla);

const kia = new HybridCar("Kia", "Picanto", 100);
