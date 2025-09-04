// 1. Singleton Pattern
// Ensure a class has only one instance and provide a global access point to it.

class Configuration {
  private static instance: Configuration; // Encapsulation
  private settings: { [key: string]: string } = {};

  // Private constructor prevents direct instantiation
  private constructor() {}

  // Public method to get the single instance
  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }
    return Configuration.instance;
  }

  public set(key: string, value: string): void {
    this.settings[key] = value;
  }

  public get(key: string): string | undefined {
    return this.settings[key];
  }
}

// Client Code:
const config_1 = Configuration.getInstance();
config_1.set("theme", "dark");
config_1.get("theme"); // Output: dark

const config_2 = Configuration.getInstance();

console.log(config_1 === config_2); // true

// SOLID Principles:
// - Single Responsibility Principle (SRP): The Configuration class is responsible only for managing configuration settings.
// - Encapsulation: Ensures internal settings are hidden and accessed through controlled methods.
