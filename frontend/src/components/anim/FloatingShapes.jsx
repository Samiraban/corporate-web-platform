import { motion, useReducedMotion } from 'framer-motion';

/**
 * A layer of slow-moving, blurred shapes used behind hero/section
 * content to keep backgrounds alive without distracting from text.
 * variant: 'dark' (for ink-900 sections) | 'light' (for canvas sections)
 */
export default function FloatingShapes({ variant = 'dark', className = '' }) {
  const reduceMotion = useReducedMotion();
const color = variant === 'dark' ? 'bg-brass-400' : 'bg-ink-300';
  if (reduceMotion) return null;

  const shapes = [
    { size: 320, top: '-8%', left: '65%', duration: 22, opacity: 0.12 },
    { size: 220, top: '55%', left: '5%', duration: 18, opacity: 0.1 },
    { size: 160, top: '20%', left: '15%', duration: 26, opacity: 0.08 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${color}`}
          style={{ width: s.size, height: s.size, top: s.top, left: s.left, opacity: s.opacity }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}