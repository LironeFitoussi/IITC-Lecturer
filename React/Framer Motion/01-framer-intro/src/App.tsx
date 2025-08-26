import { motion } from "framer-motion";
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>🎬 Framer Motion - Basic Examples</h1>
      
      <div className="examples-container">
        {/* Slide 4 - Basic motion.div */}
        <div className="example">
          <h2>📦 Basic motion.div</h2>
          <p>Simple black box</p>
          <motion.div
            style={{ 
              width: 150, 
              height: 150, 
              background: "black",
              margin: "20px auto"
            }}
          />
        </div>

        {/* Slide 5 - initial/animate */}
        <div className="example">
          <h2>🔄 initial → animate</h2>
          <p>Auto rotation from 0° to 180°</p>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 180 }}
            style={{ 
              width: 150, 
              height: 150, 
              background: "blue",
              margin: "20px auto"
            }}
          />
        </div>

        {/* Additional example - color animation */}
        <div className="example">
          <h2>🎨 Color & Scale Change</h2>
          <p>Animation of size and color</p>
          <motion.div
            initial={{ 
              scale: 0.5, 
              backgroundColor: "#ff6b6b" 
            }}
            animate={{ 
              scale: 1.2, 
              backgroundColor: "#4ecdc4" 
            }}
            style={{ 
              width: 100, 
              height: 100, 
              margin: "20px auto",
              borderRadius: "50%"
            }}
          />
        </div>

        {/* Additional example - movement */}
        <div className="example">
          <h2>➡️ Movement in Space</h2>
          <p>Side to side motion</p>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 100, opacity: 1 }}
            style={{ 
              width: 80, 
              height: 80, 
              background: "linear-gradient(45deg, #ff9a9e, #fecfef)",
              margin: "20px auto",
              borderRadius: "10px"
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
