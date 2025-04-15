// src/app/components/MotionWrap.tsx
import React from 'react';
import { motion } from 'framer-motion';

const MotionWrap = (Component: React.ComponentType, idName: string) => function HOC() {
  return (
    <motion.div
      whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      className="app__container" // You might not need this class specifically
      id={idName} // Ensure the ID is passed down
    >
      <Component />
    </motion.div>
  );
};

export default MotionWrap;