// Interface Segregation Principle (ISP)
// Definition: Clients should not be forced to implement interfaces they don’t use.

// Separate interfaces for specific responsibilities.
interface Printer {
  print(): void;
}

interface Scanner {
  scan(): void;
}

class MultiFunctionPrinter implements Printer, Scanner {
  print(): void {
    console.log("Printing in MultiFunctionPrinter...");
  }
  scan(): void {
    console.log("Scanning...");
  }
}

class SimplePrinter implements Printer {
  print(): void {
    console.log("Printing in SimplePrinter...");
  }
}

// Usage
const devices: Printer[] = [new MultiFunctionPrinter(), new SimplePrinter()];
devices.forEach((device) => device.print()); // Outputs: "Printing...", "Printing..."

const multiFunctionPrinter = new MultiFunctionPrinter();
multiFunctionPrinter.scan();
multiFunctionPrinter.print();
