import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './App.css'

// Slide 6 - Transition Demo Components
function TransitionDemo() {
  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
      <motion.div
        initial={{ rotate: 0, scale: 0.9 }}
        animate={{ rotate: 180, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "backInOut", // או: [0.22, 1, 0.36, 1]
        }}
        style={{ width: 150, height: 150, background: "#111", borderRadius: 12 }}
      />
      
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 22, mass: 1 }}
        style={{ width: 150, height: 150, background: "#333", borderRadius: 12 }}
      />
    </div>
  );
}

// Slide 7 - Variants Demo
const boxVariants = {
  hidden: { opacity: 0, y: -24, rotate: 0 },
  show:   { opacity: 1, y: 0,   rotate: 180 },
  exit:   { opacity: 0, y: 24,  rotate: 0 },
};

function VariantsDemo() {
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ width: 150, height: 150, background: "#222", borderRadius: 12, margin: "0 auto" }}
    />
  );
}

// Slide 8 - Exit Demo with AnimatePresence
const card = {
  in:  { opacity: 1, scale: 1,   rotate: 0   },
  out: { opacity: 0, scale: 0.9, rotate: -10 },
};

function ExitDemo() {
  const [show, setShow] = useState<boolean>(true);

  return (
    <div style={{ display: "grid", placeItems: "center", gap: 16 }}>
      <button onClick={() => setShow(s => !s)}>Show / Hide</button>

      <AnimatePresence /* קריטי בשביל exit */>
        {show && (
          <motion.div
            key="card"
            variants={card}
            initial="out"
            animate="in"
            exit="out"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
              width: 220, height: 140, background: "#333",
              borderRadius: 16, display: "grid", placeItems: "center", color: "#fff",
            }}
          >
            I disappear smoothly!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Slide 9 - PopLayout Demo
function PopLayoutDemo() {
  const [show, setShow] = useState<boolean>(true);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <button onClick={() => setShow(s => !s)}>Toggle Box</button>

      <AnimatePresence mode="popLayout">
        {show && (
          <motion.div
            key="box"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            style={{ width: 200, height: 80, background: "#444", borderRadius: 12 }}
          />
        )}
      </AnimatePresence>

      {/* האלמנט הזה יזוז 'ברכות' לתוך המקום שפונה */}
      <motion.button layout style={{ justifySelf: "start" }}>
        I move smoothly thanks to layout
      </motion.button>
    </div>
  );
}

// Slide 10 - Advanced Transitions Demo
function AdvancedTransitionsDemo() {
  return (
    <motion.div
      initial={{ x: -40, opacity: 0, rotate: 0 }}
      animate={{ x: 0,  opacity: 1, rotate: 180 }}
      transition={{
        // כללית
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // cubic-bezier מותאם
        delay: 0.1,
        // פר-מאפיין
        x:       { type: "spring", stiffness: 260, damping: 20 },
        opacity: { duration: 0.35, ease: "easeOut" },
        rotate:  { duration: 0.6,  repeat: 1, repeatType: "reverse" },
      }}
      style={{ width: 150, height: 150, background: "#555", borderRadius: 12, margin: "0 auto" }}
    />
  );
}

function App() {
  return (
    <div className="app">
      <h1>🎬 Framer Motion - Advanced Examples (Slides 6-10)</h1>
      
      <div className="examples-container">
        {/* Slide 6 - Transition Control */}
        <div className="example">
          <h2>⏱️ Transition Control (Duration / Ease / Spring)</h2>
          <p>Left: backInOut ease, Right: spring physics</p>
          <TransitionDemo />
        </div>

        {/* Slide 7 - Variants */}
        <div className="example">
          <h2>🧱 Variants as External Object</h2>
          <p>Using named states: hidden → show</p>
          <VariantsDemo />
        </div>

        {/* Slide 8 - AnimatePresence + Exit */}
        <div className="example">
          <h2>🚪 Exit Animations with AnimatePresence</h2>
          <p>Smooth unmount animations</p>
          <ExitDemo />
        </div>

        {/* Slide 9 - PopLayout Mode */}
        <div className="example">
          <h2>📐 PopLayout Mode</h2>
          <p>Layout flow management on exit</p>
          <PopLayoutDemo />
        </div>

        {/* Slide 10 - Advanced Transitions */}
        <div className="example">
          <h2>🎚️ Advanced Transitions</h2>
          <p>Per-property, bezier, delay & repeat</p>
          <AdvancedTransitionsDemo />
        </div>
      </div>
    </div>
  )
}

export default App
