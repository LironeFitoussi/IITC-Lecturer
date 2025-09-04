// Interface Segregation Principle (ISP)
// Definition: Clients should not be forced to implement interfaces they don’t use.

// This interface forces all classes to implement unnecessary methods.
interface Machine {
  print(): void;
  scan(): void;
}

class SimplePrinter implements Machine {
  print(): void {
    console.log("Printing...");
  }

  scan(): void {
    throw new Error("Scan not supported!");
  }
}

// Usage
const printer = new SimplePrinter();
printer.print(); // Works
printer.scan(); // Throws an error
