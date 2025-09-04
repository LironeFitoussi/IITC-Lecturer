// 3. Observer Pattern
// Context: A weather monitoring system where multiple displays (observers) react to changes in weather data.

interface WeatherObserver {
  update(temperature: number): void; // Abstraction
}

class TemperatureDisplay implements WeatherObserver {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Reacts to the updated temperature
  update(temperature: number): void {
    console.log(`${this.name}: Displaying new temperature: ${temperature}`); // Polymorphism
  }
}

class WeatherStation {
  private observers: WeatherObserver[] = []; // Encapsulation
  private temperature: number = 0; // Encapsulation

  // Adds a new observer
  public addObserver(observer: WeatherObserver): void {
    this.observers.push(observer);
  }

  // Removes an existing observer
  public removeObserver(observer: WeatherObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Notifies all observers about the updated temperature
  public notifyObservers(): void {
    this.observers.forEach((observer) => observer.update(this.temperature)); // Polymorphism
  }

  // Updates the temperature and notifies observers
  public setTemperature(temp: number): void {
    console.log(`WeatherStation: New temperature is ${temp}`);
    this.temperature = temp;
    this.notifyObservers();
  }
}

// Usage
const display1 = new TemperatureDisplay("Rup");
const display2 = new TemperatureDisplay("Sharon");

const station = new WeatherStation();

station.addObserver(display1);
station.addObserver(display2);
station.setTemperature(25);
station.setTemperature(30);

// SOLID Principles:
// - Dependency Inversion Principle (DIP): WeatherStation depends on the abstraction (WeatherObserver) instead of concrete implementations.
// - Open/Closed Principle (OCP): New types of observers can be added without changing the WeatherStation.
// - Single Responsibility Principle (SRP): Each class has a single reason to change (e.g., WeatherStation manages temperature and observers).
