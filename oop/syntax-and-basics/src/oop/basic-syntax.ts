let nextId = 1;

class Person {
  id: number;
  fName: string;

  constructor(name: string) {
    this.fName = name;
    this.id = nextId;
    nextId++;
  }

  talk() {
    return "im talking!";
  }
  introduceSelf() {
    return `hi im ${this.fName}`;
  }
}

const p1 = new Person("Tal");
const p2 = new Person("Porat");

console.log("p1", p1);
console.log("p2", p2);

console.log("p1.introduceSelf()", p1.introduceSelf());
console.log("p2.introduceSelf()", p2.introduceSelf());
