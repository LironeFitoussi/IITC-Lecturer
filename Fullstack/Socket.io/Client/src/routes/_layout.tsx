import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <nav>
          <h1>My App</h1>
          {/* Add navigation links here */}
        </nav>
      </header>
      
      <main className="app-main">
        <Outlet />
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2025 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}
