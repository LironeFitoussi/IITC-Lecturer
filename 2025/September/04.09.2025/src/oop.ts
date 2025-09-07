// console.log("Hello, World!");

class Car {
    constructor(
        public make: string,
        public model: string,
        public year: number,
        public gazType: string,
        public maxSpeed: number
    ) {}

    currentSpeed = 70

    drive() {
        if (this.currentSpeed === 0) {
            console.log("You need to restart Engine");
            this.restartEngine()
        }
        console.log(`${this.make} ${this.model} is driving at ${this.currentSpeed}`);
    }
    slowDown(speed: number) {
        if (this.currentSpeed <= speed) {
            this.currentSpeed = 0
            console.log('The Car Stoped');
            return
        }

        this.currentSpeed -= speed
        console.log(`${this.make} ${this.model} is driving now slower at ${this.currentSpeed}`);
    }
    restartEngine(){
        this.currentSpeed = 70
        console.log("Engine restarted");
    }
}

const newCar1 = new Car('Toyota', 'Corola', 2010, '95', 210);
const newCar2 = new Car('Volkswagen', 'Scirocco', 2015, '95', 240);
const newCar3 = new Car('Chevrolet', 'Spark', 2018, '92', 170);

// newCar1.drive()
// newCar1.slowDown(10)
// newCar1.slowDown(10)
// newCar1.slowDown(10)
// newCar1.slowDown(10)
// newCar1.slowDown(10)
// newCar1.slowDown(10)
// newCar1.slowDown(10)

newCar1.drive()

newCar1.make = "Baba"
console.log(newCar1);
// console.log(newCar2);
// console.log(newCar3);
