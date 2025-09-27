// Dependency Inversion Principle (DIP)

// High-level modules should not depend on low-level modules.
// Both should depend on abstractions.
// Abstractions should depend details, details should not depend on abstractions

// high level module
class PaymentService {
  // The PaymentService is tightly coupled to StripePaymentProcessor. (no abstractions)
  private stripeProcessor = new StripePaymentProcessor();
  private paypalProcessor = new PaypalPaymentProcessor();

  makePayment(amount: number, processorType: "stripe" | "paypal"): void {
    if (processorType === "stripe") {
      this.stripeProcessor.process(amount);
    } else if (processorType === "paypal") {
      this.paypalProcessor.process(amount);
    }
  }
}

// low level module
class StripePaymentProcessor {
  process(amount: number): void {
    console.log(`Processed $${amount} using Stripe.`);
  }
}

// low level module
class PaypalPaymentProcessor {
  process(amount: number): void {
    console.log(`Processed $${amount} using Stripe.`);
  }
}

// Usage
const paymentService = new PaymentService();
paymentService.makePayment(100, "stripe"); // Only supports stripe.
paymentService.makePayment(100, "paypal"); // Only supports paypal.
