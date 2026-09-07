import { motion, useReducedMotion } from 'framer-motion';

/**
 * Splits text into words (or lines) and reveals them with a stagger.
 * split: 'word' | 'char' | 'line'
 */
export default function AnimatedText({
  text,
  as: Tag = 'p',
  split = 'word',
  className = '',
  delay = 0,
  staggerDelay = 0.04,
  once = true,
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <Tag className={className}>{text}</Tag>;

  const pieces = split === 'char' ? text.split('') : text.split(' ');
  const joiner = split === 'char' ? '' : '\u00A0';

  const MotionTag = motion[Tag] || motion.p;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      variants={{ visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } } }}
      aria-label={text}
    >
      {pieces.map((piece, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          variants={{
            hidden: { opacity: 0, y: '0.6em', filter: 'blur(4px)' },
            visible: { opacity: 1, y: '0em', filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          aria-hidden="true"
        >
          {piece}
          {i < pieces.length - 1 ? joiner : ''}
        </motion.span>
      ))}
    </MotionTag>
  );
}