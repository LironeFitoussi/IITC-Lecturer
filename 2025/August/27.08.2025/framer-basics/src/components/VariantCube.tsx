import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cubeVariants = {
    hidden: { opacity: 0, y: 2, rotateY: 180, scale: 0 },
    show: { opacity: 1, y: 0, rotateY: 0, scale: 1 },
    exit: { opacity: 0, y: -2, rotateY: -180, scale: 0 },
}

export default function VariantCube() {
    const [show, setShow] = useState(true)

    function handleToggle() {
        setShow(!show)
    }

    return (
        <div className='flex flex-col items-center h-50 w-50 bg-gray-100'>
            <button
                onClick={handleToggle}
                className='bg-blue-500 text-white px-4 py-2 rounded mb-4'
            >
                {show ? 'Hide' : 'Show'} Cube
            </button>
            <AnimatePresence>
                {show && (
                    <motion.div
                        variants={cubeVariants}
                        initial='hidden'
                        animate='show'
                        exit='exit'
                        transition={{
                            opacity: { duration: 10, delay: 0.4 },
                            scale: { duration: 10, delay: 0.2 },
                            rotateY: { duration: 0.2 },
                        }}
                        className="w-32 h-32 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-bold"
                    >
                        Variant Cube
                    </motion.div>
                )
                }
            </AnimatePresence>
        </div>
    )
}