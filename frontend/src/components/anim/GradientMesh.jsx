import { motion, useReducedMotion } from 'framer-motion';

export default function GradientMesh({ className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* SOLID MUTED LAVENDER PURPLE — NO COLOR MIXING */}
      <div className="absolute inset-0 bg-[#C4B5D8]" />

      {/* Existing animation structure preserved.
          No visible additional colour. */}
      <motion.div
        className="absolute rounded-full bg-transparent"
        style={{
          width: 620,
          height: 620,
          top: '-25%',
          left: '42%',
        }}
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, 35, -25, 0],
                y: [0, -25, 20, 0],
                scale: [1, 1.08, 0.96, 1],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}