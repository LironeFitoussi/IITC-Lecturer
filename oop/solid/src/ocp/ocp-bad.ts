// Open/Closed Principle (OCP)
// Definition: Classes should be open for extension but closed for modification.

// This class violates OCP because adding a new type of discount requires modifying this class.
class Discount {
  apply(amount: number, type: string): number {
    if (type === "percentage") {
      return amount - amount * 0.1; // 10% discount
    } else if (type === "fixed") {
      return amount - 20; // Fixed $20 discount
    }
    return amount; // No discount
  }
}

// Usage
const discount = new Discount();
console.log(discount.apply(100, "percentage")); // 90
console.log(discount.apply(100, "fixed")); // 80
