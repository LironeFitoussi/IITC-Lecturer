// Single Responsibility Principle (SRP)
// class should have one and only one reason to change, meaning that a class should have only one job.

// The Invoice class is only responsible for managing the invoice data.
class Invoice {
  constructor(public amount: number, public customer: string) {}
}

// The InvoiceReporter class is responsible for printing the invoice.
class InvoiceReporter {
  print(invoice: Invoice): void {
    console.log(`Invoice for ${invoice.customer}: $${invoice.amount}`);
  }
}

// Usage
const invoice = new Invoice(200, "John Doe");
const reporter = new InvoiceReporter();
reporter.print(invoice); // Prints the invoice
