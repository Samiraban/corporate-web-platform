import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import NepalFlag from './anim/NepalFlag';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Only show once per browser session — repeat visits within the
    // session skip straight to the site.
    if (sessionStorage.getItem('osg_preloaded')) {
      setDone(true);
      return;
    }
    let raf;
    const start = performance.now();
    const totalMs = reduceMotion ? 200 : 1400;

    const tick = (now) => {
      const pct = Math.min(100, ((now - start) / totalMs) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('osg_preloaded', '1');
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink-900 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <NepalFlag size={64} />
          </motion.div>

          <motion.h1
            className="font-serif text-2xl text-white mt-6 tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            OS Group
          </motion.h1>

          <div className="w-48 h-[2px] bg-white/15 mt-6 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-brass-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <p className="text-ink-400 text-xs mt-3 tabular-nums">{Math.floor(progress)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}