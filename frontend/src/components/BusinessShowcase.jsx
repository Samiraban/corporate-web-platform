import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A numbered list (01, 02, 03…) where hovering a row highlights it and
 * crossfades a large image on the side (desktop). On smaller screens,
 * where hover doesn't apply, each row instead reveals a smaller inline
 * image beneath its own description when tapped/expanded, so mobile
 * visitors still get a visual instead of text-only rows.
 *
 * items: [{ number, title, description, image, to }]
 */
export default function BusinessShowcase({ items }) {
  const [active, setActive] = useState(0);

  if (!items.length) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        {items.map((item, i) => (
          <Link
            to={item.to}
            key={item.number}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className="group block border-b border-ink-100 py-6 first:pt-0"
          >
            <div className="flex items-baseline gap-4">
              <span
                className={`font-serif text-lg shrink-0 transition-colors duration-300 ${
                  active === i ? 'text-brass-500' : 'text-ink-200'
                }`}
              >
                {item.number}
              </span>
              <h3
                className={`font-serif text-2xl md:text-3xl font-semibold transition-colors duration-300 ${
                  active === i ? 'text-ink-900' : 'text-ink-300'
                }`}
              >
                {item.title}
              </h3>
            </div>
            <AnimatePresence initial={false}>
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 pl-9 text-sm text-ash max-w-md leading-relaxed">
                    {item.description}
                  </p>
                  {item.image && (
                    <div className="lg:hidden mt-4 pl-9 pr-4">
                      <div className="aspect-[16/10] rounded overflow-hidden bg-ink-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded bg-ink-100 hidden lg:block">
        <AnimatePresence mode="wait">
          <motion.img
            key={items[active].image || items[active].number}
            src={items[active].image}
            alt={items[active].title}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent" />
      </div>
    </div>
  );
}