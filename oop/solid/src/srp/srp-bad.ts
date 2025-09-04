// Single Responsibility Principle (SRP)
// Definition: A class should have one and only one reason to change, meaning that a class should have only one job.

// This class violates SRP because it handles multiple responsibilities:
// 1. Managing the invoice data
// 2. Printing the invoice
class Invoice {
  constructor(public amount: number, public customer: string) {}

  printInvoice(): void {
    console.log(`Invoice for ${this.customer}: $${this.amount}`);
  }
}

// Usage
const invoice = new Invoice(200, "John Doe");
invoice.printInvoice(); // Prints the invoice
