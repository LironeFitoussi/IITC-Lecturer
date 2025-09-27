import React, { useState, useRef } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useAnimate,
  useReducedMotion,
  useDragControls,
  LayoutGroup,
  Reorder
} from "framer-motion";
import './App.css'

// Slide 26 - Advanced Keyframes: Color Transitions
function ColorKeyframesDemo() {
  return (
    <motion.div
      animate={{ backgroundColor: ["#f00", "#0f0", "#00f", "#f00"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ 
        width: 120, 
        height: 120, 
        borderRadius: 12, 
        margin: "0 auto",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontWeight: "bold"
      }}
    >
      Color Loop
    </motion.div>
  );
}

// Slide 27 - Keyframes + Gestures
function KeyframesGesturesDemo() {
  return (
    <motion.div
      whileHover={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 0.6 }}
      style={{ 
        width: 100, 
        height: 100, 
        background: "#333",
        borderRadius: 8,
        margin: "0 auto",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        color: "#fff"
      }}
    >
      Hover Me
    </motion.div>
  );
}

// Slide 28 - Infinite Animations
function InfiniteAnimationsDemo() {
  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
        style={{ 
          width: 60, 
          height: 60, 
          background: "#e74c3c",
          borderRadius: 8
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ 
          width: 60, 
          height: 60, 
          background: "#3498db",
          borderRadius: 8
        }}
      />
    </div>
  );
}

// Slide 29 - useScroll Progress Bar
function ScrollDemo() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 6,
        background: "blue",
        width: "100%",
        scaleX: scrollYProgress,
        transformOrigin: "0% 50%",
        zIndex: 1000
      }}
    />
  );
}

// Slide 30 - useSpring + Scroll
function SpringScrollDemo() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 1
  });

  return (
    <motion.div 
      style={{ 
        scaleX, 
        transformOrigin: "left", 
        background: "linear-gradient(45deg, #667eea, #764ba2)", 
        height: 6,
        position: "fixed",
        top: 6,
        left: 0,
        width: "100%",
        zIndex: 999
      }} 
    />
  );
}

// Slide 31-32 - useTransform
function TransformDemo() {
  const { scrollYProgress } = useScroll();
  const color = useTransform(scrollYProgress, [0, 1], ["#00f", "#0f0"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center", margin: "2rem 0" }}>
      <motion.div 
        style={{ 
          background: color, 
          height: 100, 
          width: 100,
          borderRadius: 8
        }} 
      />
      <motion.div 
        style={{ 
          rotate, 
          width: 100, 
          height: 100, 
          background: "red",
          borderRadius: 8
        }} 
      />
    </div>
  );
}

// Slide 33 - Stagger Animations
function StaggerDemo() {
  const container = {
    animate: { transition: { staggerChildren: 0.2 } }
  };
  const item = { 
    initial: { opacity: 0, y: 20 }, 
    animate: { opacity: 1, y: 0 } 
  };

  return (
    <motion.ul 
      variants={container} 
      initial="initial" 
      animate="animate"
      style={{ listStyle: "none", padding: 0, display: "grid", gap: "10px" }}
    >
      {[1,2,3,4].map(n => (
        <motion.li 
          key={n} 
          variants={item}
          style={{
            background: "#f39c12",
            padding: "10px 20px",
            borderRadius: 8,
            color: "#fff",
            textAlign: "center"
          }}
        >
          Item {n}
        </motion.li>
      ))}
    </motion.ul>
  );
}

// Slide 34 - LayoutGroup
function LayoutGroupDemo() {
  const [selected, setSelected] = useState(false);

  return (
    <LayoutGroup>
      <div style={{ display: "grid", placeItems: "center", gap: "20px" }}>
        <button onClick={() => setSelected(!selected)}>
          Toggle Size
        </button>
        {selected ? (
          <motion.div 
            layoutId="box" 
            style={{ 
              width: 200, 
              height: 200, 
              background: "blue",
              borderRadius: 12
            }} 
          />
        ) : (
          <motion.div 
            layoutId="box" 
            style={{ 
              width: 100, 
              height: 100, 
              background: "blue",
              borderRadius: 12
            }} 
          />
        )}
      </div>
    </LayoutGroup>
  );
}

// Slide 35 - Dragging
function DragDemo() {
  return (
    <motion.div
      drag
      dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
      style={{ 
        width: 120, 
        height: 120, 
        background: "#555", 
        borderRadius: 12,
        cursor: "grab",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        margin: "50px auto"
      }}
      whileDrag={{ cursor: "grabbing" }}
    >
      Drag Me!
    </motion.div>
  );
}

// Slide 36 - Drag Controls
function DragControlsDemo() {
  const controls = useDragControls();

  return (
    <div style={{ display: "grid", placeItems: "center", gap: "20px" }}>
      <button onPointerDown={(e) => controls.start(e)}>
        Enable Drag
      </button>
      <motion.div 
        drag="x" 
        dragControls={controls}
        style={{
          width: 120,
          height: 80,
          background: "#9b59b6",
          borderRadius: 8,
          display: "grid",
          placeItems: "center",
          color: "#fff"
        }}
      >
        Controlled Drag
      </motion.div>
    </div>
  );
}

// Slide 37 - Reorder
function ReorderDemo() {
  const [items, setItems] = useState(["A", "B", "C", "D"]);

  return (
    <Reorder.Group 
      values={items} 
      onReorder={setItems}
      style={{ listStyle: "none", padding: 0, display: "grid", gap: "10px" }}
    >
      {items.map(item => (
        <Reorder.Item 
          key={item} 
          value={item}
          style={{
            background: "#2ecc71",
            padding: "15px",
            borderRadius: 8,
            color: "#fff",
            textAlign: "center",
            cursor: "grab",
            userSelect: "none"
          }}
        >
          Item {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

// Slide 38 - useAnimate
function UseAnimateDemo() {
  const [scope, animate] = useAnimate();

  return (
    <div ref={scope} style={{ display: "grid", placeItems: "center", gap: "20px" }}>
      <button onClick={() => animate("div", { rotate: 360 }, { duration: 1 })}>
        Animate Child
      </button>
      <div style={{ 
        width: 100, 
        height: 100, 
        background: "red",
        borderRadius: 8
      }} />
    </div>
  );
}

// Slide 39 - Reduced Motion
function ReducedMotionDemo() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduce ? { opacity: 1 } : { x: [0, 100, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{
        width: 100,
        height: 100,
        background: "#34495e",
        borderRadius: 8,
        margin: "0 auto",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontSize: "0.8rem",
        textAlign: "center"
      }}
    >
      {shouldReduce ? "Reduced" : "Full Motion"}
    </motion.div>
  );
}

function App() {
  return (
    <div className="app">
      <ScrollDemo />
      <SpringScrollDemo />
      
      <h1>🎯 Framer Motion - Advanced Finals (Slides 26-40)</h1>
      
      {/* Hero Section */}
      <div style={{ height: "60vh", display: "grid", placeItems: "center", background: "linear-gradient(45deg, #667eea, #764ba2)", color: "white", borderRadius: "12px", marginBottom: "3rem" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Complete Framer Motion Mastery</h2>
          <p>Advanced techniques, scroll effects, drag & drop, and more!</p>
        </div>
      </div>

      <TransformDemo />
      
      <div className="examples-container">
        {/* Slides 26-28: Advanced Keyframes */}
        <div className="example">
          <h2>🎞️ Advanced Keyframes</h2>
          <p>Color transitions and gesture combinations</p>
          <ColorKeyframesDemo />
          <div className="code-explanation">
            <h4>Features:</h4>
            <ul>
              <li>✅ <code>backgroundColor: ["#f00", "#0f0", "#00f"]</code></li>
              <li>✅ Color loops with easeInOut</li>
              <li>✅ Any CSS property can be animated</li>
            </ul>
          </div>
        </div>

        <div className="example">
          <h2>⚡ Keyframes + Gestures</h2>
          <p>Shake effect on hover</p>
          <KeyframesGesturesDemo />
          <div className="code-explanation">
            <h4>Hover shake:</h4>
            <ul>
              <li>✅ <code>whileHover={`{{ rotate: [0, 10, -10, 0] }}`}</code></li>
              <li>✅ Keyframes work in gestures too</li>
            </ul>
          </div>
        </div>

        <div className="example">
          <h2>🔁 Infinite Animations</h2>
          <p>Loop and mirror repeat types</p>
          <InfiniteAnimationsDemo />
          <div className="code-explanation">
            <h4>Infinite options:</h4>
            <ul>
              <li>✅ <code>repeat: Infinity</code></li>
              <li>✅ <code>repeatType: "mirror"</code> for back-and-forth</li>
              <li>✅ <code>ease: "linear"</code> for constant speed</li>
            </ul>
          </div>
        </div>

        {/* Slide 33: Stagger */}
        <div className="example">
          <h2>⏱️ Stagger Animations</h2>
          <p>Sequential child animations</p>
          <StaggerDemo />
          <div className="code-explanation">
            <h4>Stagger features:</h4>
            <ul>
              <li>✅ <code>staggerChildren: 0.2</code></li>
              <li>✅ Parent controls child timing</li>
              <li>✅ Great for list reveals</li>
            </ul>
          </div>
        </div>

        {/* Slide 34: Layout */}
        <div className="example">
          <h2>📦 LayoutGroup</h2>
          <p>Shared element transitions</p>
          <LayoutGroupDemo />
          <div className="code-explanation">
            <h4>Layout features:</h4>
            <ul>
              <li>✅ <code>layoutId="box"</code> tracks element</li>
              <li>✅ Smooth morphing between states</li>
              <li>✅ Perfect for modals and image zoom</li>
            </ul>
          </div>
        </div>

        {/* Slides 35-37: Drag & Drop */}
        <div className="example">
          <h2>✋ Drag & Drop</h2>
          <p>Simple dragging with constraints</p>
          <DragDemo />
          <div className="code-explanation">
            <h4>Drag features:</h4>
            <ul>
              <li>✅ <code>drag</code> enables dragging</li>
              <li>✅ <code>dragConstraints</code> sets boundaries</li>
              <li>✅ <code>whileDrag</code> for drag state styling</li>
            </ul>
          </div>
        </div>

        <div className="example">
          <h2>🎛️ Drag Controls</h2>
          <p>Controlled drag initiation</p>
          <DragControlsDemo />
          <div className="code-explanation">
            <h4>Control features:</h4>
            <ul>
              <li>✅ <code>useDragControls()</code></li>
              <li>✅ <code>controls.start(event)</code></li>
              <li>✅ Custom drag handles</li>
            </ul>
          </div>
        </div>

        <div className="example">
          <h2>🔄 Reorderable Lists</h2>
          <p>Drag to reorder with animations</p>
          <ReorderDemo />
          <div className="code-explanation">
            <h4>Reorder features:</h4>
            <ul>
              <li>✅ <code>Reorder.Group</code> container</li>
              <li>✅ <code>Reorder.Item</code> draggable items</li>
              <li>✅ Built-in reorder animations</li>
            </ul>
          </div>
        </div>

        {/* Slide 38: useAnimate */}
        <div className="example">
          <h2>🎯 useAnimate</h2>
          <p>Direct animation control</p>
          <UseAnimateDemo />
          <div className="code-explanation">
            <h4>Direct control:</h4>
            <ul>
              <li>✅ <code>const [scope, animate] = useAnimate()</code></li>
              <li>✅ <code>animate("selector", props, options)</code></li>
              <li>✅ GSAP-like direct animation</li>
            </ul>
          </div>
        </div>

        {/* Slide 39: Accessibility */}
        <div className="example">
          <h2>♿ Reduced Motion</h2>
          <p>Accessibility-aware animations</p>
          <ReducedMotionDemo />
          <div className="code-explanation">
            <h4>Accessibility:</h4>
            <ul>
              <li>✅ <code>useReducedMotion()</code></li>
              <li>✅ Respects user preferences</li>
              <li>✅ Fallback to static states</li>
            </ul>
          </div>
        </div>

        {/* Slide 40: Summary */}
        <div className="example summary">
          <h2>📚 Complete Mastery Summary</h2>
          <div className="summary-grid">
            <div className="summary-section">
              <h3>🔧 Core Concepts</h3>
              <ul>
                <li>motion components</li>
                <li>initial/animate/exit</li>
                <li>Variants & Transitions</li>
                <li>AnimatePresence</li>
              </ul>
            </div>
            <div className="summary-section">
              <h3>🎮 Interactions</h3>
              <ul>
                <li>whileHover/whileTap</li>
                <li>whileInView</li>
                <li>useAnimationControls</li>
                <li>Gestures & Events</li>
              </ul>
            </div>
            <div className="summary-section">
              <h3>📜 Scroll & Transform</h3>
              <ul>
                <li>useScroll</li>
                <li>useSpring</li>
                <li>useTransform</li>
                <li>Progress bars</li>
              </ul>
            </div>
            <div className="summary-section">
              <h3>🎯 Advanced</h3>
              <ul>
                <li>Layout animations</li>
                <li>Drag & Drop</li>
                <li>Reorder lists</li>
                <li>useAnimate</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <h3>🎉 You now master Framer Motion!</h3>
            <p>From basic animations to advanced interactions - you've got it all!</p>
          </div>
        </div>
      </div>
      
      {/* Bottom spacer */}
      <div style={{ height: "50vh", display: "grid", placeItems: "center", background: "linear-gradient(45deg, #764ba2, #667eea)", color: "white", borderRadius: "12px", marginTop: "3rem" }}>
        <div style={{ textAlign: "center" }}>
          <h2>🚀 Ready to build amazing animations!</h2>
          <p>You've completed the full Framer Motion journey</p>
        </div>
      </div>
    </div>
  )
}

export default App
