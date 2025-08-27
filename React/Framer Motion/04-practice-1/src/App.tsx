import { motion, MotionConfig } from "framer-motion";
import './App.css'

// Practice Exercise - Complete Solution
function BouncingCard() {
  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
      <motion.div
        // Keyframes animation with precise timing
        initial={{ y: 0 }}
        animate={{ y: [0, -40, 0] }}
        transition={{
          duration: 1.5,
          times: [0, 0.5, 1], // Peak at exactly 50%
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5
        }}
        // Hover and tap interactions
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.95, rotate: -2 }}
        style={{
          width: 200,
          height: 120,
          borderRadius: 16,
          background: "#333",
          color: "#fff",
          display: "grid",
          placeItems: "center",
          fontSize: "1.2rem",
          cursor: "pointer",
          margin: "0 auto"
        }}
      >
        Bounce Me
      </motion.div>
    </MotionConfig>
  );
}

// Question 1 Answer - Custom times for 50% peak
function Question1Answer() {
  return (
    <motion.div
      animate={{ y: [0, -40, 0] }}
      transition={{
        duration: 2,
        times: [0, 0.5, 1], // Peak happens at exactly 50% of the duration
        ease: "easeInOut",
        repeat: Infinity
      }}
      style={{
        width: 100,
        height: 100,
        background: "#4CAF50",
        borderRadius: 8,
        margin: "0 auto"
      }}
    />
  );
}

// Question 2 Answer - Without MotionConfig
function Question2Answer() {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        rotate: 2,
        transition: { duration: 0.1, ease: "linear" } // Different transition
      }}
      whileTap={{ 
        scale: 0.95, 
        rotate: -2,
        transition: { duration: 0.5, ease: "backOut" } // Another different transition
      }}
      style={{
        width: 150,
        height: 80,
        borderRadius: 12,
        background: "#FF9800",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        margin: "0 auto"
      }}
    >
      Different Transitions
    </motion.div>
  );
}

// Question 3 Answer - Infinite loop
function Question3Answer() {
  return (
    <motion.div
      animate={{ 
        y: [0, -40, 0],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 2,
        times: [0, 0.5, 1],
        ease: "easeInOut",
        repeat: Infinity, // This makes it loop infinitely
        repeatType: "loop"
      }}
      style={{
        width: 100,
        height: 100,
        background: "#9C27B0",
        borderRadius: 8,
        margin: "0 auto"
      }}
    />
  );
}

function App() {
  return (
    <div className="app">
      <h1>📝 Interactive Bouncing Card - Complete Solution</h1>
      
      <div className="examples-container">
        {/* Main Exercise Solution */}
        <div className="example">
          <h2>🎯 BouncingCard - Complete Solution</h2>
          <p>Keyframes + whileHover/whileTap + MotionConfig</p>
          <BouncingCard />
          <div className="code-explanation">
            <h4>Features implemented:</h4>
            <ul>
              <li>✅ Keyframes: y: [0, -40, 0] with times: [0, 0.5, 1]</li>
              <li>✅ whileHover: scale: 1.05, rotate: 2</li>
              <li>✅ whileTap: scale: 0.95, rotate: -2</li>
              <li>✅ MotionConfig wrapper for consistent transitions</li>
              <li>✅ Infinite loop with repeatDelay</li>
            </ul>
          </div>
        </div>

        {/* Question 1 Answer */}
        <div className="example">
          <h2>❓ Question 1: 50% Peak Timing</h2>
          <p>times: [0, 0.5, 1] - peak at exactly 50%</p>
          <Question1Answer />
          <div className="answer">
            <strong>Answer:</strong> Use <code>times: [0, 0.5, 1]</code> to make the peak occur at exactly 50% of the duration.
          </div>
        </div>

        {/* Question 2 Answer */}
        <div className="example">
          <h2>❓ Question 2: Without MotionConfig</h2>
          <p>Different transitions for hover vs tap</p>
          <Question2Answer />
          <div className="answer">
            <strong>Answer:</strong> Without MotionConfig, you can set different transitions per interaction. 
            Hover uses linear (0.1s), tap uses backOut (0.5s).
          </div>
        </div>

        {/* Question 3 Answer */}
        <div className="example">
          <h2>❓ Question 3: Infinite Loop</h2>
          <p>repeat: Infinity + rotation animation</p>
          <Question3Answer />
          <div className="answer">
            <strong>Answer:</strong> Add <code>repeat: Infinity</code> and <code>repeatType: "loop"</code> 
            to make the animation continue forever.
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
