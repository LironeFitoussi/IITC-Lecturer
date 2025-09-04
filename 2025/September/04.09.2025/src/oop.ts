// console.log("Hello, World!");

class Car {
    constructor(
        public make: string,
        public model: string,
        public year: number,
        public gazType: string,
        public maxSpeed: number
    ) { }
    drive() {
        console.log(`${this.make} ${this.model} is driving at ${this.maxSpeed}`);
    }
    slowDown(speed: number) {
        if (this.maxSpeed <= speed) {
            console.log('The Car Stoped');
            return
        }

        this.maxSpeed -= speed
        console.log(`${this.make} ${this.model} is driving now slower at ${this.maxSpeed}`);
    }
}

const newCar1 = new Car('Toyota', 'Corola', 2010, '95', 210);
const newCar2 = new Car('Volkswagen', 'Scirocco', 2015, '95', 240);
const newCar3 = new Car('Chevrolet', 'Spark', 2018, '92', 170);

newCar1.drive()
newCar1.slowDown(10)
newCar1.slowDown(10)
newCar1.slowDown(10)
newCar1.slowDown(10)
newCar1.slowDown(10)
newCar1.slowDown(50)
newCar1.slowDown(50)
newCar1.slowDown(50)
newCar1.slowDown(50)
newCar2.slowDown(50)
newCar3.slowDown(50)
newCar1.drive()

// console.log(newCar1);
// console.log(newCar2);
// console.log(newCar3);
