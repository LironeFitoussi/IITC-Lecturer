// Open/Closed Principle (OCP)
// Definition: Classes should be open for extension but closed for modification.

// Using an interface allows adding new types of discounts without modifying existing code.
interface Discount {
  apply(amount: number): number;
}

class PercentageDiscount implements Discount {
  constructor(private percentage: number) {}

  apply(amount: number): number {
    return amount - (amount * this.percentage) / 100;
  }
}

class FixedDiscount implements Discount {
  constructor(private discountValue: number) {}

  apply(amount: number): number {
    return amount - this.discountValue;
  }
}

// Client code: The discounts implement the same interface, allowing polymorphism.
const discounts: Discount[] = [
  new PercentageDiscount(10), // 10% discount
  new FixedDiscount(20), // $20 discount
];

discounts.forEach((discount) => console.log(discount.apply(100))); // Outputs: 90, 80
