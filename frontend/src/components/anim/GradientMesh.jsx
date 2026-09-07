import { motion, useReducedMotion } from 'framer-motion';

/**
 * Premium dark navy and champagne gold gradient mesh.
 * Designed for a luxury corporate look with subtle,
 * controlled lighting instead of overly saturated colors.
 */
export default function GradientMesh({ className = '' }) {
  const reduceMotion = useReducedMotion();

  const blobs = [
    // Deep royal blue - main premium accent
    {
      color: '#1E3A8A',
      size: 620,
      top: '-25%',
      left: '42%',
      duration: 26,
      opacity: 0.42,
    },

    // Rich navy blue - adds depth on the left
    {
      color: '#0F2A5F',
      size: 560,
      top: '28%',
      left: '-18%',
      duration: 22,
      opacity: 0.55,
    },

    // Soft champagne gold - elegant warm highlight
    {
      color: '#C9A227',
      size: 480,
      top: '42%',
      left: '68%',
      duration: 30,
      opacity: 0.28,
    },

    // Muted premium gold - subtle lower lighting
    {
      color: '#8B6B1F',
      size: 380,
      top: '75%',
      left: '35%',
      duration: 24,
      opacity: 0.18,
    },

    // Soft steel blue - gentle accent
    {
      color: '#3B82B6',
      size: 360,
      top: '-10%',
      left: '5%',
      duration: 20,
      opacity: 0.20,
    },
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Premium dark base */}
      <div className="absolute inset-0 bg-[#08111F]" />

      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px]"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            backgroundColor: b.color,
            opacity: b.opacity,
            mixBlendMode: 'screen',
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
            duration: b.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle dark overlay to keep the design sophisticated */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08111F]/35 via-transparent to-[#08111F]/20" />
    </div>
  );
}