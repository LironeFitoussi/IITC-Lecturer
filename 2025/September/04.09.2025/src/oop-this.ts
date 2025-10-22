// class User {
//     constructor(
//         public name: string,
//         private hobbies: any[]
//     ){}

//     greet() {
//         console.log(`Hello my name is ${this.name}`);
//     }

//     get hobbiesGetter() {
//         return this.hobbies
//     }
// }




// const u1 = new User('Dana', ['Football', 'cooking', 'reading', 'swimming'])
// const u2 = new User('Liroy', ['gaming', 'music', 'traveling'])
// const u3 = new User('Shani', ['painting', 'dancing', 'yoga'])

// u1.greet()
// u2.greet()
// u3.greet()

// console.log(u1.hobbiesGetter);
// console.log(u1.hobbies); // Throws erro and resolves with undefined

// // ----------------------------------------------------


// class Bank {
//     private balance: number = 0

//     printBalance () {
//         console.log(this.balance);
//     }

//     isValidNumber (num: number) {
//        return (!isNaN(num) && num > 0) ? true : false
//     }
//     deposite (amount: number) {
//         if (!this.isValidNumber(amount)) {
//             console.log('you cant put bad number');
//             return
//         }
//         this.balance += amount
//     }

//     set withdraw (amount: number) {
//         if (!this.isValidNumber(amount)) return
//         this.balance -= amount
//     }
// }

// const ba1 = new Bank()

// ba1.printBalance()

// ba1.deposite("baba")
// ba1.printBalance()



// -----

// class Animal {
//     constructor(protected name: string) {}
// }


// class Dog extends Animal{
//     bark() {
//         console.log('Woof Woof from ' + this.name);
//     }
// }

// // const a1 = new Animal('Bambi')
// const d1 = new Dog('Nala')

// console.log(d1);


// -------------------------------

// interface Drivable {
//     drive(): void;
// }

// interface CarDetails {
//     brand: string;
//     model: string;
// }

// class Bike implements Drivable {
//     drive(): void {
//         console.log("Bike is driving");
//     }
// }

// class Car implements Drivable, CarDetails {
//     constructor( private _brand: string, private _model: string){}
//     drive(): void {
//         console.log("Car is Driving!")
//     }

//     get brand() {
//         return this._brand
//     }

//     get model() {
//         return this._model
//     }
// }

// const c1 = new Car("Toyota", 'Corola') 
// const b1 = new Bike() 

// console.log(c1.brand);

// console.log(c1);

// b1.drive()
// c1.drive()


// --------------------------------------

abstract class Shape {
    abstract name: string
    describe(){
        console.log('Hello');
    }
}

class Rectangle extends Shape {
    constructor(public name: string) {
        super()
    }
}

const babaShape = new Rectangle('שניצל אחד אחי')
// const babaShape1 = new Shape()

console.log(babaShape);
