import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import './App.css'

// Slide 22 - whileInView Demo
function WhileInViewDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        width: 200, height: 120, background: "#333",
        borderRadius: 12, display: "grid", placeItems: "center", color: "#fff",
        margin: "0 auto"
      }}
    >
      I appear when in view!
    </motion.div>
  );
}

// Slide 23 - Once: true Demo
function OnceDemo() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        width: 180, height: 100, background: "#4CAF50",
        borderRadius: 12, display: "grid", placeItems: "center", color: "#fff",
        margin: "0 auto"
      }}
    >
      Once Only Animation
    </motion.div>
  );
}

// Slide 24 - useInView Hook Demo
function InViewHookDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <motion.div
      ref={ref}
      style={{ 
        width: 200, 
        height: 120, 
        background: isInView ? "green" : "red",
        borderRadius: 12,
        display: "grid",
        placeItems: "center",
        color: "#fff",
        margin: "0 auto",
        transition: "background-color 0.3s"
      }}
    >
      {isInView ? "I'm on screen!" : "I'm off screen..."}
    </motion.div>
  );
}

// Slide 25 - Combining useInView with Motion
function RevealSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 }); // חצי אלמנט לפחות

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
      style={{ 
        height: 200, 
        background: "#222", 
        color: "#fff", 
        display: "grid", 
        placeItems: "center",
        borderRadius: 12,
        margin: "0 auto"
      }}
    >
      {inView ? "Visible!" : "Hidden..."}
    </motion.div>
  );
}

// Multiple reveal sections for scroll testing
function ScrollRevealDemo() {
  const items = [
    { text: "First Item", color: "#e74c3c" },
    { text: "Second Item", color: "#3498db" },
    { text: "Third Item", color: "#2ecc71" },
    { text: "Fourth Item", color: "#f39c12" },
    { text: "Fifth Item", color: "#9b59b6" }
  ];

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          style={{
            width: 250,
            height: 80,
            background: item.color,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontSize: "1.1rem",
            fontWeight: "bold",
            margin: "0 auto"
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>👀 Viewport Animations & Advanced Hooks (Slides 21-25)</h1>
      
      {/* Spacer to create scroll content */}
      <div style={{ height: "50vh", display: "grid", placeItems: "center", background: "linear-gradient(45deg, #667eea, #764ba2)", color: "white", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2>Scroll down to see viewport animations!</h2>
      </div>
      
      <div className="examples-container">
        {/* Slide 21 - Why Viewport Animations? */}
        <div className="example">
          <h2>👀 Why Viewport Animations?</h2>
          <div className="explanation">
            <p><strong>Benefits:</strong></p>
            <ul>
              <li>Makes long pages interactive and engaging</li>
              <li>Reveals content gradually during scroll</li>
              <li>Improves UX - content appears when needed</li>
              <li>Common for: headers, images, content cards</li>
            </ul>
          </div>
        </div>

        {/* Slide 22 - whileInView */}
        <div className="example">
          <h2>✨ whileInView Prop</h2>
          <p>Built-in prop for scroll-triggered animations</p>
          <WhileInViewDemo />
          <div className="code-explanation">
            <h4>Key concepts:</h4>
            <ul>
              <li>✅ <code>whileInView={`{{ opacity: 1, y: 0 }}`}</code></li>
              <li>✅ Just like whileHover, but for viewport</li>
              <li>✅ Combines with initial state</li>
            </ul>
          </div>
        </div>

        {/* Slide 23 - viewport once: true */}
        <div className="example">
          <h2>🔂 Once: True Option</h2>
          <p>Animation runs only once when first viewed</p>
          <OnceDemo />
          <div className="code-explanation">
            <h4>Once option:</h4>
            <ul>
              <li>✅ <code>viewport={`{{ once: true }}`}</code></li>
              <li>✅ Prevents re-animation on scroll</li>
              <li>✅ Perfect for headers and permanent content</li>
            </ul>
          </div>
        </div>

        {/* Slide 24 - useInView Hook */}
        <div className="example">
          <h2>⚡ useInView Hook</h2>
          <p>Full control with boolean state</p>
          <InViewHookDemo />
          <div className="code-explanation">
            <h4>Hook features:</h4>
            <ul>
              <li>✅ <code>const isInView = useInView(ref)</code></li>
              <li>✅ Returns true/false for viewport state</li>
              <li>✅ Useful for API calls, state changes</li>
            </ul>
          </div>
        </div>

        {/* Slide 25 - Combining Hook with Motion */}
        <div className="example">
          <h2>🧩 Hook + Motion Combined</h2>
          <p>Advanced control with amount threshold</p>
          <RevealSection />
          <div className="code-explanation">
            <h4>Advanced features:</h4>
            <ul>
              <li>✅ <code>useInView(ref, {`{ amount: 0.5 }`})</code></li>
              <li>✅ Controls animation based on visibility</li>
              <li>✅ Custom thresholds and conditions</li>
            </ul>
          </div>
        </div>

        {/* Bonus - Multiple scroll reveals */}
        <div className="example">
          <h2>🎯 Multiple Scroll Reveals</h2>
          <p>Staggered animations with different directions</p>
          <ScrollRevealDemo />
          <div className="code-explanation">
            <h4>Staggered reveals:</h4>
            <ul>
              <li>✅ Alternating slide directions (left/right)</li>
              <li>✅ Staggered delays for cascade effect</li>
              <li>✅ Once: true for performance</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom spacer */}
      <div style={{ height: "50vh", display: "grid", placeItems: "center", background: "linear-gradient(45deg, #764ba2, #667eea)", color: "white", borderRadius: "12px", marginTop: "2rem" }}>
        <h2>🎉 You've seen all the viewport animations!</h2>
      </div>
    </div>
  )
}

export default App
