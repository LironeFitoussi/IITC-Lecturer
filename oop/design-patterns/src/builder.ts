// 5. Builder Pattern
// Context: Constructing a complex object (a computer) step-by-step.

class Computer {
  public CPU: string = "";
  public RAM: string = "";
  public storage: string = "";
  public GPU: string = "";

  // Displays the specifications of the computer
  public displaySpecs(): void {
    console.log(
      `Computer Specs: CPU=${this.CPU}, RAM=${this.RAM}, Storage=${this.storage}, GPU=${this.GPU}`
    );
  }
}

class ComputerBuilder {
  private computer: Computer; // Encapsulation

  constructor() {
    // Initializes a new computer object
    this.computer = new Computer();
  }

  public setCPU(cpu: string): ComputerBuilder {
    this.computer.CPU = cpu;
    return this;
  }

  public setRAM(ram: string): ComputerBuilder {
    this.computer.RAM = ram;
    return this;
  }

  public setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  public setGPU(gpu: string): ComputerBuilder {
    this.computer.GPU = gpu;
    return this;
  }

  // Builds and returns the final computer object
  public build(): Computer {
    return this.computer;
  }
}

// Client Code
const computerBuilder = new ComputerBuilder();

const myComputer = computerBuilder
  .setCPU("Intel i9")
  .setRAM("32GB")
  .setStorage("1TB SSD")
  .setGPU("NVIDIA RTX 5090")
  .build();

myComputer.displaySpecs();
// Output: Computer Specs: CPU=Intel i9, RAM=32GB, Storage=1TB SSD, GPU=NVIDIA RTX 5090

// SOLID Principles:
// - Single Responsibility Principle (SRP): Each method in the builder is responsible for constructing one part of the object.
// - Open/Closed Principle (OCP): New components (e.g., motherboard) can be added without modifying existing methods.
// - Encapsulation: Builder hides the complexity of constructing the Computer.
