import { motion, useReducedMotion } from 'framer-motion';

/**
 * An original wireframe-globe graphic (latitude/longitude grid + a
 * scatter of "presence" dots) used as a decorative background behind
 * story/narrative sections. Deliberately abstract rather than a real
 * world-map illustration — conveys "global network" without reproducing
 * any specific copyrighted map artwork.
 */
export default function GlobeGraphic({ className = '' }) {
  const reduceMotion = useReducedMotion();

  const dots = [
    { cx: 130, cy: 90 }, { cx: 260, cy: 60 }, { cx: 320, cy: 140 },
    { cx: 90, cy: 200 }, { cx: 220, cy: 230 }, { cx: 300, cy: 260 },
    { cx: 160, cy: 300 }, { cx: 60, cy: 130 }, { cx: 340, cy: 90 },
  ];

  return (
    <div className={`pointer-events-none select-none relative ${className}`} aria-hidden="true">
      <motion.svg
        viewBox="0 0 400 400"
        className="w-full h-full opacity-[0.08]"
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" />
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <ellipse
            key={deg}
            cx="200" cy="200" rx={180 * Math.abs(Math.cos((deg * Math.PI) / 180)) || 4} ry="180"
            fill="none" stroke="currentColor" strokeWidth="0.75"
            transform={`rotate(${deg} 200 200)`}
          />
        ))}
        {[40, 90, 140].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeWidth="0.5" />
        ))}
      </motion.svg>

      <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0">
        {dots.map((d, i) => (
          <motion.circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r="3.5"
            className="fill-brass-400"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.7, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          />
        ))}
      </svg>
    </div>
  );
}