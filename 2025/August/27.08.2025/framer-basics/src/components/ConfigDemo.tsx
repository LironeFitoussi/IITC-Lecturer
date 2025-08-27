import React from "react";
import { motion, MotionConfig, useAnimationControls } from "framer-motion";

const cubeVariants = {
    hidden: { opacity: 0, y: 50, rotateY: 180, scale: 0 },
    show: { opacity: 1, y: 0, rotateY: 0, scale: 1 },
    exit: { opacity: 0, y: -50, rotateY: -180, scale: 0 },
}

const ConfigDemo: React.FC = () => {
    const controls = useAnimationControls();

    function handleBluePill() {
        controls.start("show");
    }

    function handleRedPill() {
        controls.start("hidden");
    }

    async function handleGreenPill() {
        await controls.start({ x: 100 });
        await controls.start({ y: 100 });
        await controls.start({ x: 0 });
        await controls.start({ y: 0 });
    }

    return (
        <MotionConfig
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <motion.button
                onClick={handleBluePill}
                // whileHover={{ scale: 2 }}
                // whileTap={{ scale: 0.9 }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Blue Pill
            </motion.button>
            <motion.button
                // whileHover={{ scale: 2 }}
                // whileTap={{ scale: 0.9 }}
                onClick={handleRedPill}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Red Pill
            </motion.button>

            <motion.button
                onClick={handleGreenPill}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Sequence move
            </motion.button>
            <motion.div
                variants={cubeVariants}
                initial='hidden'
                animate={controls}
                className="w-32 h-32 rounded-2xl bg-blue-500 hover:bg-blue-700 flex items-center justify-center text-white font-bold"
            >
                Cube
            </motion.div>
        </MotionConfig>
    );
};

export default ConfigDemo;