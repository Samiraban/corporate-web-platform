import { motion, useReducedMotion } from 'framer-motion';

/**
 * Wraps any content and reveals it as it enters the viewport.
 *
 * direction: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'none'
 * delay: seconds to wait before starting (used for staggering siblings manually)
 * duration: animation length in seconds
 * once: whether the animation should only play the first time (default true)
 */
export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 28,
  once = true,
  className = '',
  as = 'div',
}) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduceMotion) {
    // Respect prefers-reduced-motion: render instantly, no motion.
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const variants = {
    up: { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
    blur: { hidden: { opacity: 0, filter: 'blur(10px)' }, visible: { opacity: 1, filter: 'blur(0px)' } },
    none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  }[direction];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Tag>
  );
}

/** Wraps a group of children and staggers their entrance. Pair with <StaggerItem>. */
export function StaggerContainer({ children, className = '', staggerDelay = 0.12, once = true }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{ visible: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', direction = 'up', distance = 24 }) {
  const variants = {
    up: { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  }[direction] || { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div className={className} variants={variants} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}