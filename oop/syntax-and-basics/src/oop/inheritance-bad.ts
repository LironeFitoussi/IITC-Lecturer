// export class Bird {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }
// }

// class FlyingBird extends Bird {
//   constructor(name: string) {
//     super(name);
//   }

//   fly() {}
// }

// class SwimmingBird extends Bird {
//   constructor(name: string) {
//     super(name);
//   }

//   swim() {}
// }

// class Dror extends FlyingBird {
//   constructor(name: string) {
//     super(name);
//   }
// }

// class Pinguin extends SwimmingBird {
//   constructor(name: string) {
//     super(name);
//   }
// }

// Duck will need to fly AND swim. this is hard with inheritace

interface Flyer {
  fly(): void;
}

interface Swimmer {
  swim(): void;
}

class Bird {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Dror extends Bird implements Flyer {
  constructor(name: string) {
    super(name);
  }

  fly() {}
}

class Pinguin extends Bird implements Swimmer {
  constructor(name: string) {
    super(name);
  }

  swim() {}
}

class Duck extends Bird implements Swimmer, Flyer {
  constructor(name: string) {
    super(name);
  }

  swim() {}
  fly() {}
}

function flyBirds(birds: Flyer[]) {
  birds.forEach((b) => b.fly());
}

flyBirds([new Dror("baba"), new Dror("baba"), new Pinguin("baba")]);
