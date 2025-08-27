import React from "react";
import { motion, MotionConfig } from "framer-motion";

const ConfigDemo: React.FC = () => {
    return (
       <MotionConfig 
            transition={{ duration: 2, ease: "easeInOut" }}
       >
            <motion.button
                whileHover={{ scale: .5 }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Blue Pill
            </motion.button>
            <motion.button
                whileHover={{ scale: 10 }}
                whileTap={{ scale: 0.9 }}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Red Pill
            </motion.button>

       </MotionConfig>
    );
};

export default ConfigDemo;