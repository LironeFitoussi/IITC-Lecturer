import { useState } from 'react'
import './App.css'

function App() {
  const [selectedCookie, setSelectedCookie] = useState<string | null>(null)

  const cookies = [
    {
      id: 1,
      name: "עוגיות שוקולד צ'יפס",
      price: "₪25",
      image: "🍪",
      description: "עוגיות חמאה רכות עם שוקולד צ'יפס איכותי"
    },
    {
      id: 2,
      name: "עוגיות שיבולת שועל",
      price: "₪22",
      image: "🥠",
      description: "עוגיות בריאות עם שיבולת שועל וצימוקים"
    },
    {
      id: 3,
      name: "עוגיות חמאת בוטנים",
      price: "₪28",
      image: "🥜",
      description: "עוגיות עשירות בטעם חמאת בוטנים טבעית"
    },
    {
      id: 4,
      name: "עוגיות וניל",
      price: "₪24",
      image: "🧈",
      description: "עוגיות קלאסיות בטעם וניל עדין"
    },
    {
      id: 5,
      name: "עוגיות קוקוס",
      price: "₪26",
      image: "🥥",
      description: "עוגיות אקזוטיות עם קוקוס מגורד"
    },
    {
      id: 6,
      name: "עוגיות דבש",
      price: "₪30",
      image: "🍯",
      description: "עוגיות מתוקות עם דבש טבעי ותבלינים"
    }
  ]

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1 className="logo">
            <span className="cookie-emoji">🍪</span>
            Sweet Dreams Cookies
          </h1>
          <nav className="nav">
            <a href="#home">בית</a>
            <a href="#products">מוצרים</a>
            <a href="#about">אודות</a>
            <a href="#contact">צור קשר</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">עוגיות הבית הטעימות ביותר</h2>
          <p className="hero-subtitle">
            מכינים בבית עוגיות טריות ומתוקות עם אהבה ומרכיבים איכותיים
          </p>
          <button className="cta-button">
            הזמן עכשיו 🛒
          </button>
        </div>
        <div className="hero-image">
          <span className="big-cookie">🍪</span>
        </div>
      </section>

      {/* Products Section */}
      <section className="products" id="products">
        <div className="container">
          <h2 className="section-title">המוצרים שלנו</h2>
          <div className="products-grid">
            {cookies.map((cookie) => (
              <div 
                key={cookie.id} 
                className={`product-card ${selectedCookie === cookie.name ? 'selected' : ''}`}
                onClick={() => setSelectedCookie(selectedCookie === cookie.name ? null : cookie.name)}
              >
                <div className="product-image">{cookie.image}</div>
                <h3 className="product-name">{cookie.name}</h3>
                <p className="product-description">{cookie.description}</p>
                <div className="product-price">{cookie.price}</div>
                <button className="add-to-cart">הוסף לעגלה</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <h2>אודות Sweet Dreams</h2>
            <p>
              אנחנו מכינים עוגיות בית טריות ומתוקות מאז 2020. 
              כל עוגייה נאפית בקפידה עם מרכיבים טבעיים ואיכותיים ביותר.
              המטרה שלנו היא להביא לכם את הטעם הכי טוב עם האהבה הכי גדולה.
            </p>
            <div className="features">
              <div className="feature">
                <span>🌱</span>
                <span>מרכיבים טבעיים</span>
              </div>
              <div className="feature">
                <span>👩‍🍳</span>
                <span>מכינים בבית</span>
              </div>
              <div className="feature">
                <span>🚚</span>
                <span>משלוח מהיר</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Sweet Dreams Cookies. כל הזכויות שמורות.</p>
          <div className="social">
            <span>📞 050-123-4567</span>
            <span>📧 info@sweetdreams.co.il</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
