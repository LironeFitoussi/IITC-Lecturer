// Define an interface representing a general saver
// (abstraction)
interface Saver {
  save(key: string, value: string): void; // Save data
  get(key: string): string | null; // Retrieve data
}

// Implementation of Saver using LocalStorage
// (concrete implementation)
export class LocalStorageSaver implements Saver {
  save(key: string, value: string): void {
    localStorage.setItem(key, value);
    console.log(`Saved ${value} in LocalStorage with key ${key}`);
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }
}

// Implementation of Saver using SessionStorage
// (concrete implementation)
export class SessionStorageSaver implements Saver {
  save(key: string, value: string): void {
    sessionStorage.setItem(key, value);
    console.log(`Saved ${value} in SessionStorage with key ${key}`);
  }

  get(key: string): string | null {
    return sessionStorage.getItem(key);
  }
}

// Usage example
const localSaver = new LocalStorageSaver();
localSaver.save("name", "John");
console.log(localSaver.get("name")); // Output: John

const sessionSaver = new SessionStorageSaver();
sessionSaver.save("name", "Doe");
console.log(sessionSaver.get("name")); // Output: Doe
