// Dependency Inversion Principle (DIP)
// High-level modules should not depend on low-level modules.
// Both should depend on abstractions.
// Abstractions should not depend on details; details should depend on abstractions.

// Using an interface allows flexibility in choosing the payment processor.

// abstractions (no depending on details)
interface PaymentProcessor {
  processPayment(amount: number): void;
}

// low level module (depend on abstractions)
class StripePaymentProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processed $${amount} using Stripe.`);
  }
}

// low level module (depend on abstractions)
class PayPalPaymentProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processed $${amount} using PayPal.`);
  }
}

class ApplePayPaymentProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processed $${amount} using ApplePay.`);
  }
}

class GooglePayPaymentProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processed $${amount} using GooglePay.`);
  }
}

// high level module
class PaymentService {
  // high level module depend on abstractions
  constructor(private paymentProcessor: PaymentProcessor) {}

  makePayment(amount: number): void {
    this.paymentProcessor.processPayment(amount);
  }
}

// Usage
const stripe = new PaymentService(new StripePaymentProcessor());
const paypal = new PaymentService(new PayPalPaymentProcessor());
const applePay = new PaymentService(new ApplePayPaymentProcessor());

stripe.makePayment(100);
paypal.makePayment(100);
// Outputs:
// "Processed $100 using Stripe."
// "Processed $100 using PayPal."

//////////////////////////////

// Usage in loop
const processors: PaymentProcessor[] = [
  new StripePaymentProcessor(),
  new PayPalPaymentProcessor(),
];

processors.forEach((processor) => {
  const service = new PaymentService(processor);
  service.makePayment(100);
});

// Outputs:
// "Processed $100 using Stripe."
// "Processed $100 using PayPal."
