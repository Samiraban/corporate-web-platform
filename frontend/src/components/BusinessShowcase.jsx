import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, MoveUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const FALLBACK_IMAGES = [
  '/company-slides/project-1.jpg',
  '/company-slides/project-2.jpg',
  '/company-slides/project-3.jpg',
  '/company-slides/project-4.jpg',
  '/images/os-group-project.jpg',
];

/**
 * Bright, image-led industries showcase used on the homepage.
 * No dark overlays or dark section backgrounds are used here.
 */
export default function BusinessShowcase({ items = [] }) {
  const [active, setActive] = useState(0);

  if (!items.length) return null;

  const activeItem = items[active] || items[0];
  const activeImage = activeItem.image || FALLBACK_IMAGES[active % FALLBACK_IMAGES.length];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
      {/* Industry list */}
      <div className="rounded-[2rem] border border-[#eee7dc] bg-[#fffdf9] p-5 shadow-[0_20px_60px_rgba(164,133,77,0.08)] sm:p-7">
        {items.map((item, index) => {
          const isActive = active === index;

          return (
            <Link
              to={item.to || '/industries'}
              key={`${item.number}-${item.title}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className="group block border-b border-[#eee7dc] last:border-b-0"
            >
              <motion.div
                animate={{
                  x: isActive ? 7 : 0,
                  backgroundColor: isActive ? '#faf4e8' : '#fffdf9',
                }}
                transition={{ duration: 0.35, ease }}
                className="relative my-1 overflow-hidden rounded-2xl px-4 py-5 sm:px-5 sm:py-6"
              >
                <motion.span
                  animate={{ width: isActive ? 42 : 18 }}
                  transition={{ duration: 0.4, ease }}
                  className="absolute left-0 top-0 h-[3px] bg-[#c79a45]"
                />

                <div className="flex items-start gap-4">
                  <motion.span
                    animate={{
                      color: isActive ? '#b1843c' : '#a9a092',
                      y: isActive ? -2 : 0,
                    }}
                    className="mt-1 shrink-0 font-serif text-sm font-semibold tracking-[0.12em]"
                  >
                    {item.number}
                  </motion.span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <motion.h3
                        animate={{
                          color: isActive ? '#8d6a32' : '#6e675e',
                        }}
                        transition={{ duration: 0.3 }}
                        className="font-serif text-2xl font-semibold leading-tight sm:text-3xl"
                      >
                        {item.title}
                      </motion.h3>

                      <motion.span
                        animate={{
                          x: isActive ? 0 : -5,
                          opacity: isActive ? 1 : 0.45,
                          rotate: isActive ? 0 : -10,
                        }}
                        className="hidden shrink-0 text-[#b1843c] sm:block"
                      >
                        <MoveUpRight size={19} />
                      </motion.span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: 8 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -6 }}
                          transition={{ duration: 0.35, ease }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 max-w-xl text-sm leading-7 text-[#81796e]">
                            {item.description ||
                              'Specialist expertise and dependable solutions delivered across the OS Group network.'}
                          </p>

                          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b1843c]">
                            Explore industry
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                              <ArrowRight size={15} />
                            </motion.span>
                          </div>

                          <div className="mt-5 overflow-hidden rounded-xl lg:hidden">
                            <motion.img
                              src={item.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                              alt={item.title}
                              loading="lazy"
                              initial={{ opacity: 0, scale: 1.05 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.55, ease }}
                              className="h-48 w-full object-cover"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Image showcase */}
      <motion.div
        initial={{ opacity: 0, x: 45 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease }}
        className="relative hidden lg:block"
      >
        <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full border border-[#dbc79f] opacity-70" />
        <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-[#f5ead7] opacity-80" />

        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-[#eadfce] bg-[#f7f1e7] p-2 shadow-[0_28px_80px_rgba(164,133,77,0.12)]">
          <AnimatePresence mode="wait">
            <motion.img
              key={`${activeItem.number}-${activeImage}`}
              src={activeImage}
              alt={activeItem.title}
              initial={{ opacity: 0, scale: 1.08, x: 18 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.03, x: -18 }}
              transition={{ duration: 0.65, ease }}
              className="h-full w-full rounded-[1.5rem] object-cover"
            />
          </AnimatePresence>

          <motion.div
            key={activeItem.number}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease }}
            className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/60 bg-white/[0.88] p-5 shadow-lg backdrop-blur-md"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b1843c]">
                  OS Group / {activeItem.number}
                </p>
                <h4 className="mt-2 font-serif text-2xl font-semibold text-[#6e675e]">
                  {activeItem.title}
                </h4>
              </div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5ead7] text-[#b1843c]"
              >
                <ArrowRight size={17} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="mt-5 flex items-center justify-between px-1">
          <div className="flex gap-2">
            {items.map((item, index) => (
              <button
                key={item.number}
                type="button"
                aria-label={`Show ${item.title}`}
                onClick={() => setActive(index)}
                className="h-1.5 rounded-full bg-[#e8dfd1] transition-all duration-300"
              >
                <motion.span
                  animate={{ width: active === index ? 34 : 9 }}
                  transition={{ duration: 0.35, ease }}
                  className="block h-1.5 rounded-full bg-[#c79a45]"
                />
              </button>
            ))}
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a49a8b]">
            Hover to explore
          </span>
        </div>
      </motion.div>
    </div>
  );
}
