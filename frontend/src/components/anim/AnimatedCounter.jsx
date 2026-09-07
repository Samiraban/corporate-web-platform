import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';

/**
 * Counts from 0 up to `value` when scrolled into view, once.
 * value: number to count up to
 * suffix/prefix: e.g. suffix="+" prefix="$"
 */
export default function AnimatedCounter({ value, duration = 1.8, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value, duration, reduceMotion]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}