import { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Wraps a button/link and gives it a subtle magnetic pull toward the
 * cursor, plus a light-sweep hover effect. Disabled automatically on
 * touch devices and when prefers-reduced-motion is set.
 */
export default function MagneticButton({ children, className = '', as: Tag = 'button', strength = 0.25, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  const isTouch = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;

  // motion[Tag] only works for plain string tags ('button', 'a', 'div').
  // When `as` is a component (e.g. React Router's <Link>), it must be
  // wrapped with motion.create(Component) instead.
  const MotionTag = useMemo(
    () => (typeof Tag === 'string' ? motion[Tag] : motion.create(Tag)),
    [Tag]
  );

  const handleMouseMove = (e) => {
    if (reduceMotion || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: relX * strength, y: relY * strength });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <MotionTag
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.3 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {!reduceMotion && (
        <motion.span
          className="absolute inset-0 bg-white/15"
          initial={{ x: '-120%', skewX: -20 }}
          whileHover={{ x: '120%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
    </MotionTag>
  );
}