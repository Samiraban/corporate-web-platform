import { motion, useReducedMotion } from 'framer-motion';

/**
 * A premium, respectful rendering of the Nepal flag: correct double-
 * pennant (crimson field, blue border, white sun and moon), with a
 * subtle continuous "waving fabric" motion driven by an SVG
 * feTurbulence/feDisplacementMap filter, plus a smooth entrance.
 *
 * size: pixel width of the flag (height follows the flag's proportions)
 */
export default function NepalFlag({ size = 220, className = '' }) {
  const reduceMotion = useReducedMotion();
  const width = size;
  const height = size * 1.16; // approximate real proportions of the pennant shape

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        viewBox="0 0 100 116"
        width={width}
        height={height}
        role="img"
        aria-label="Flag of Nepal"
        style={{ filter: reduceMotion ? 'none' : 'url(#osg-flag-wave)' }}
      >
        <defs>
          {/* Turbulence-based cloth wave — subtle, continuous, GPU-cheap since it's filter-based */}
          {!reduceMotion && (
            <filter id="osg-flag-wave" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" numOctaves="2" seed="7" result="noise">
                <animate attributeName="baseFrequency" values="0.010 0.03;0.014 0.035;0.010 0.03" dur="6s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          )}
          <linearGradient id="osg-flag-shade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Blue border outline (double pennant) */}
        <path
          d="M2 2 L58 2 L58 44 L96 44 L58 86 L58 114 L2 62 Z"
          fill="#003893"
        />
        {/* Crimson field, inset from the border */}
        <path
          d="M6 6 L54 6 L54 46 L88 46 L54 82 L54 108 L6 60 Z"
          fill="#DC143C"
        />
        {/* Moon (upper pennant) - simplified crescent + rays, respectfully stylized */}
        <g transform="translate(28, 24)">
          <circle r="8.5" fill="#ffffff" />
          <circle r="6.5" cx="3" cy="-2" fill="#DC143C" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="0" y1="-11" x2="0" y2="-14.5"
              stroke="#ffffff" strokeWidth="1.4"
              transform={`rotate(${i * 45})`}
            />
          ))}
        </g>
        {/* Sun (lower pennant) - twelve-rayed sun, simplified */}
        <g transform="translate(30, 76)">
          <circle r="9" fill="#ffffff" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="0" y1="-11" x2="0" y2="-15"
              stroke="#ffffff" strokeWidth="1.4"
              transform={`rotate(${i * 30})`}
            />
          ))}
        </g>

        {/* Soft fabric sheen overlay */}
        <path d="M2 2 L58 2 L58 44 L96 44 L58 86 L58 114 L2 62 Z" fill="url(#osg-flag-shade)" />
      </svg>
    </motion.div>
  );
}