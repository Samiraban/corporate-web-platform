import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Premium two-part cursor: a small dot that follows the mouse instantly,
 * and a trailing ring (spring-eased) that expands over interactive
 * elements. Automatically disabled on touch devices and when the user
 * has prefers-reduced-motion set. This is intentionally a small accent —
 * the site's motion doesn't depend on it.
 */
export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const isTouch =
    typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion || isTouch) return;

    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const handleOver = (e) => {
      setHovering(!!e.target.closest('a, button, [role="button"], [data-cursor-hover]'));
    };
    const handleLeaveWindow = () => setVisible(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseleave', handleLeaveWindow);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseleave', handleLeaveWindow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, isTouch]);

  if (reduceMotion || isTouch || !visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full bg-brass-500"
        style={{ width: 7, height: 7, x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full border border-ink-500/50"
        animate={{ width: hovering ? 50 : 30, height: hovering ? 50 : 30, opacity: hovering ? 0.7 : 0.35 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
}