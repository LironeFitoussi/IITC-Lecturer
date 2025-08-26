import { MotionConfig, motion } from "framer-motion";
import './App.css'

// Slide 11 - Basic Keyframes Demo
function BasicKeyframesDemo() {
  return (
    <motion.div
      animate={{ y: [0, 100, -100, 0] }}
      transition={{ duration: 2 }}
      style={{ width: 100, height: 100, background: "#444", borderRadius: 8, margin: "0 auto" }}
    />
  );
}

// Slide 12 - Keyframes with Times Demo
function KeyframesTimesDemo() {
  return (
    <motion.div
      animate={{ y: [0, 100, -100, 0] }}
      transition={{
        duration: 4,
        times: [0, 0.25, 0.75, 1],
        ease: "easeInOut"
      }}
      style={{ width: 100, height: 100, background: "#555", borderRadius: 8, margin: "0 auto" }}
    />
  );
}

// Slide 13 - whileHover Demo
function WhileHoverDemo() {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: -2 }}
      transition={{ duration: 0.2 }}
      style={{
        padding: "12px 20px",
        borderRadius: 8,
        background: "#333",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        margin: "0 auto",
        display: "block"
      }}
    >
      Hover Me
    </motion.button>
  );
}

// Slide 14 - whileTap Demo
function WhileTapDemo() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, rotate: 1 }}
      transition={{ duration: 0.15 }}
      style={{
        padding: "12px 20px",
        borderRadius: 8,
        background: "#444",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        margin: "0 auto",
        display: "block"
      }}
    >
      Tap Me
    </motion.button>
  );
}

// Slide 15 - MotionConfig Demo
function ConfigDemo() {
  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          style={{
            padding: "10px 16px",
            borderRadius: 6,
            background: "#666",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Button A
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          style={{
            padding: "10px 16px",
            borderRadius: 6,
            background: "#666",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Button B
        </motion.button>
      </div>
    </MotionConfig>
  );
}

function App() {
  return (
    <div className="app">
      <h1>🎞️ Framer Motion - Keyframes & Gestures (Slides 11-15)</h1>
      
      <div className="examples-container">
        {/* Slide 11 - Basic Keyframes */}
        <div className="example">
          <h2>🎞️ Basic Keyframes with Arrays</h2>
          <p>Bounce animation: [0, 100, -100, 0]</p>
          <BasicKeyframesDemo />
        </div>

        {/* Slide 12 - Keyframes with Times */}
        <div className="example">
          <h2>⏳ Keyframes Timing Control</h2>
          <p>Custom timing with times array</p>
          <KeyframesTimesDemo />
        </div>

        {/* Slide 13 - whileHover */}
        <div className="example">
          <h2>🖱️ whileHover Interactions</h2>
          <p>Scale and rotate on hover</p>
          <WhileHoverDemo />
        </div>

        {/* Slide 14 - whileTap */}
        <div className="example">
          <h2>👆 whileTap Interactions</h2>
          <p>Feedback on click/tap</p>
          <WhileTapDemo />
        </div>

        {/* Slide 15 - MotionConfig */}
        <div className="example">
          <h2>⚙️ MotionConfig Global Settings</h2>
          <p>Shared transition settings</p>
          <ConfigDemo />
        </div>
      </div>
    </div>
  )
}

export default App
