// 2. Strategy Pattern
// Define a family of algorithms and make them interchangeable.

interface PaymentStrategy {
  pay(amount: number): void; // Abstraction
}

// Low-Level Module
class CreditCardPayment implements PaymentStrategy {
  // Concrete
  pay(amount: number): void {
    console.log(`Paid $${amount} using Credit Card.`);
  }
}

// Low Level Module
class PayPalPayment implements PaymentStrategy {
  // Concrete
  pay(amount: number): void {
    console.log(`Paid $${amount} using PayPal.`);
  }
}

// High Level Module
class ShoppingCart {
  private strategy: PaymentStrategy; // Dependency Inversion

  // Abstraction
  constructor(strategy: PaymentStrategy) {
    // Sets the initial payment strategy
    this.strategy = strategy;
  }

  // Allows changing the payment strategy dynamically
  public setPaymentStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy; // Polymorphism
  }

  // Executes payment using the current strategy
  public checkout(amount: number): void {
    this.strategy.pay(amount); // Abstraction and Polymorphism
  }
}

// Client Code
const cart = new ShoppingCart(new CreditCardPayment());
cart.checkout(100); // Output: Paid $100 using Credit Card.
cart.setPaymentStrategy(new PayPalPayment());
cart.checkout(50); // Output: Paid $50 using PayPal.

// SOLID Principles:
// - Open/Closed Principle (OCP): New payment strategies can be added without modifying existing code.
// - Dependency Inversion Principle (DIP): The ShoppingCart depends on the abstraction (PaymentStrategy) rather than concrete implementations.
// - Single Responsibility Principle (SRP): Each strategy class has a single responsibility for its specific payment logic.
