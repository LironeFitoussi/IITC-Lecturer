import { motion } from 'framer-motion'

export default function Cube() {
  return (
    <motion.div 
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
            // duration: 2,
            // ease: 'backInOut',
            type: 'spring',
            stiffness: 500,
            damping: 10,
            mass: 1,
        }}
        className="w-32 h-32 rounded-2xl bg-blue-500 hover:bg-blue-700 flex items-center justify-center text-white font-bold"
    >
      Cube
    </motion.div>
  )
}