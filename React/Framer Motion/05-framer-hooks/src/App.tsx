import React, { useState } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import './App.css'

// Slide 17 - useAnimationControls Demo
const boxVariants = {
  initial: { rotate: 0, opacity: 1 },
  flip:    { rotate: 360, opacity: 1 },
};

function ControlsDemo() {
  const controls = useAnimationControls();

  return (
    <div style={{ display: "grid", placeItems: "center", gap: 16 }}>
      <button onClick={() => controls.start("flip")}>Flip It</button>

      <motion.div
        variants={boxVariants}
        initial="initial"
        animate={controls} // ← במקום מחרוזת רגילה
        style={{ width: 120, height: 120, background: "#333", borderRadius: 12 }}
      />
    </div>
  );
}

// Slide 18 - Advanced Controls with Sequence
function SequenceDemo() {
  const controls = useAnimationControls();

  const handleSequence = async () => {
    await controls.start({ x: 100 });
    await controls.start({ y: 100 });
    await controls.start({ scale: 1.2 });
    await controls.start({ scale: 1, x: 0, y: 0 });
  };

  return (
    <div style={{ display: "grid", placeItems: "center", gap: 16 }}>
      <button onClick={handleSequence}>Start Sequence</button>
      <motion.div
        animate={controls}
        style={{ 
          width: 80, 
          height: 80, 
          background: "#555", 
          borderRadius: 8 
        }}
      />
    </div>
  );
}

// Slide 19 - AnimatePresence + Controls
function ModalDemo({ open }: { open: boolean }) {
  const controls = useAnimationControls();

  // Set initial state when modal opens
  React.useEffect(() => {
    if (open) {
      controls.set({ opacity: 1, scale: 1 });
    }
  }, [open, controls]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            controls.start({ 
              scale: 0.9,
              transition: { duration: 0.1 }
            });
            setTimeout(() => {
              controls.start({ 
                scale: 1,
                transition: { duration: 0.2 }
              });
            }, 100);
          }}
          style={{
            width: 200,
            height: 120,
            background: "#222",
            borderRadius: 16,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            margin: "0 auto"
          }}
        >
          Modal with Controls
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalController() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "grid", placeItems: "center", gap: 16, minHeight: "200px" }}>
      <button onClick={() => setOpen(!open)}>
        {open ? "Close Modal" : "Open Modal"}
      </button>
      <div style={{ minHeight: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ModalDemo open={open} />
      </div>
    </div>
  );
}

// Slide 20 - Common Use Cases
function PulseDemo() {
  const controls = useAnimationControls();

  const startPulse = () => {
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.6, repeat: 2 }
    });
  };

  return (
    <div style={{ display: "grid", placeItems: "center", gap: 16 }}>
      <button onClick={startPulse}>Pulse Animation</button>
      <motion.div
        animate={controls}
        style={{ 
          width: 100, 
          height: 100, 
          background: "#e74c3c", 
          borderRadius: "50%" 
        }}
      />
    </div>
  );
}

function MultiBoxDemo() {
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();
  const controls3 = useAnimationControls();

  const cascadeAnimation = async () => {
    controls1.start({ y: -50, rotate: 180 });
    await new Promise(resolve => setTimeout(resolve, 200));
    controls2.start({ y: -50, rotate: 180 });
    await new Promise(resolve => setTimeout(resolve, 200));
    controls3.start({ y: -50, rotate: 180 });
    
    // Reset after 1 second
    setTimeout(() => {
      controls1.start({ y: 0, rotate: 0 });
      controls2.start({ y: 0, rotate: 0 });
      controls3.start({ y: 0, rotate: 0 });
    }, 1000);
  };

  return (
    <div style={{ display: "grid", placeItems: "center", gap: 16 }}>
      <button onClick={cascadeAnimation}>Cascade Drop</button>
      <div style={{ display: "flex", gap: 10 }}>
        <motion.div
          animate={controls1}
          style={{ width: 50, height: 50, background: "#3498db", borderRadius: 4 }}
        />
        <motion.div
          animate={controls2}
          style={{ width: 50, height: 50, background: "#2ecc71", borderRadius: 4 }}
        />
        <motion.div
          animate={controls3}
          style={{ width: 50, height: 50, background: "#f39c12", borderRadius: 4 }}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>🎛️ Animation Controls & Hooks (Slides 16-20)</h1>
      
      <div className="examples-container">
        {/* Slide 16 - Why Controls? */}
        <div className="example">
          <h2>🎛️ Why Animation Controls?</h2>
          <p>Button triggers animation on separate component</p>
          <div className="explanation">
            <p>Before: Animations only triggered by the element itself (hover, tap)</p>
            <p>Now: Button can trigger animation on ANY other element!</p>
          </div>
        </div>

        {/* Slide 17 - useAnimationControls */}
        <div className="example">
          <h2>⚡ useAnimationControls Hook</h2>
          <p>Button controls separate div animation</p>
          <ControlsDemo />
          <div className="code-explanation">
            <h4>Key concepts:</h4>
            <ul>
              <li>✅ <code>const controls = useAnimationControls()</code></li>
              <li>✅ <code>animate={`{controls}`}</code> instead of string</li>
              <li>✅ <code>controls.start("variantName")</code></li>
            </ul>
          </div>
        </div>

        {/* Slide 18 - Advanced Controls */}
        <div className="example">
          <h2>⏲️ Sequential Animations</h2>
          <p>async/await for animation sequences</p>
          <SequenceDemo />
          <div className="code-explanation">
            <h4>Sequence features:</h4>
            <ul>
              <li>✅ <code>await controls.start({`{ x: 100 }`})</code></li>
              <li>✅ Multiple animations in order</li>
              <li>✅ Promise-based control flow</li>
            </ul>
          </div>
        </div>

        {/* Slide 19 - AnimatePresence + Controls */}
        <div className="example">
          <h2>🌀 AnimatePresence + Controls</h2>
          <p>Modal with both enter/exit and internal controls</p>
          <ModalController />
          <div className="code-explanation">
            <h4>Combined features:</h4>
            <ul>
              <li>✅ AnimatePresence for enter/exit</li>
              <li>✅ Controls for internal animations</li>
              <li>✅ Click modal to trigger scale animation</li>
            </ul>
          </div>
        </div>

        {/* Slide 20 - Common Use Cases */}
        <div className="example">
          <h2>💡 Common Use Cases</h2>
          <p>Practical examples from real applications</p>
          <div style={{ display: "grid", gap: "1rem" }}>
            <PulseDemo />
            <MultiBoxDemo />
          </div>
          <div className="code-explanation">
            <h4>Use cases demonstrated:</h4>
            <ul>
              <li>✅ Pulse notification (like heartbeat)</li>
              <li>✅ Cascade animation (domino effect)</li>
              <li>✅ Timed sequences with delays</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
