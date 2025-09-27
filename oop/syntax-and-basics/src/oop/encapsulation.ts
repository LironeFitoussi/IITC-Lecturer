export class BankAccount {
  private balance: number; // Private property to store the account balance

  constructor(initialBalance: number) {
    this.balance = initialBalance; // Initialize the balance
  }

  // Public method to get the current balance
  getBalance(): number {
    return this.balance;
  }

  // Public method to deposit money
  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount; // Update balance
      console.log(`Deposited: ${amount}. New balance: ${this.balance}`);
    } else {
      console.log("Deposit amount must be positive.");
    }
  }

  // Public method to withdraw money
  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount; // Deduct from balance
      console.log(`Withdrew: ${amount}. New balance: ${this.balance}`);
    } else {
      console.log("Insufficient balance or invalid amount.");
    }
  }
}

const account = new BankAccount(1000); // Create a new account with an initial balance
console.log(`Current Balance: ${account.getBalance()}`); // Output: Current Balance: 1000
account.deposit(500); // Deposited: 500. New balance: 1500
account.withdraw(200); // Withdrew: 200. New balance: 1300
account.withdraw(2000); // Output: Insufficient balance or invalid amount.
