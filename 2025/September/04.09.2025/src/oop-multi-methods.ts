class Rectangle {
    constructor (public width: number, public height: number){}
    area() {
        return this.width * this.height
    }
    perimeter () {
        return 2 * (this.width + this.height)
    }
}

const r1 = new Rectangle (10, 5)
const r2 = new Rectangle (30, 3)

console.log(r1.area(), r1.perimeter());
console.log(r2.area(), r2.perimeter());

