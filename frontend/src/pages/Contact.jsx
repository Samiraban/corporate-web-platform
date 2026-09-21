import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { toast } from 'react-hot-toast';

import api from '../services/api';
import SEO from '../components/SEO';

const ease = [0.16, 1, 0.3, 1];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 45,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -45,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 45,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const blurReveal = {
  hidden: {
    opacity: 0,
    y: 55,
    filter: 'blur(12px)',
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.95,
      ease,
    },
  },
};

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* =========================================================
   CONTACT IMAGE
========================================================= */

function ContactImage({ reducedMotion }) {
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [-30, 30]
  );

  const smoothY = useSpring(imageY, {
    stiffness: 80,
    damping: 22,
    mass: 0.5,
  });

  return (
    <motion.div
      ref={imageRef}
      variants={reducedMotion ? undefined : fadeRight}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="relative min-h-[390px] overflow-hidden rounded-[1.75rem] border border-[#e5def2] bg-[#f7f4fb] shadow-[0_20px_55px_rgba(87,67,130,0.09)] sm:min-h-[500px]"
    >
      <motion.img
        src="/images/contact.jpg"
        alt="OS Group business environment"
        style={{
          y: smoothY,
        }}
        initial={
          reducedMotion
            ? false
            : {
                scale: 1.1,
              }
        }
        whileInView={
          reducedMotion
            ? undefined
            : {
                scale: 1,
              }
        }
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 1.2,
          ease,
        }}
        whileHover={
          reducedMotion
            ? undefined
            : {
                scale: 1.035,
              }
        }
        className="absolute inset-0 h-[114%] w-full object-cover"
      />

      {/* Soft image overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/40 via-transparent to-transparent" />

      {/* TOP LABEL */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -7, 0],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="absolute left-5 top-5 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-7 sm:top-7"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7352b6]">
          Across the group
        </p>

        <p className="mt-1 font-serif text-xl font-semibold text-[#29243a]">
          People. Expertise. Progress.
        </p>
      </motion.div>

      {/* BOTTOM PANEL */}
      <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <div className="rounded-2xl border border-white/40 bg-white/90 p-5 shadow-xl backdrop-blur-sm sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7352b6]">
            What happens next
          </p>

          <div className="mt-2 flex items-end justify-between gap-5">
            <p className="max-w-md font-serif text-2xl font-semibold leading-tight text-[#29243a] sm:text-3xl">
              Tell us what you need.
              <br />
              We'll take it from there.
            </p>

            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7352b6] text-white sm:flex">
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   CONTACT DETAILS
========================================================= */

function ContactDetails({ reducedMotion }) {
  const details = [
    {
      icon: Phone,
      label: 'PHONE',
      value: '+977-1-XXXXXXX',
      href: 'tel:+97710000000',
    },
    {
      icon: Mail,
      label: 'EMAIL',
      value: 'info@osgroup.com',
      href: 'mailto:info@osgroup.com',
    },
    {
      icon: MapPin,
      label: 'LOCATION',
      value: 'Kathmandu, Nepal',
      href: null,
    },
  ];

  return (
    <motion.div
      variants={reducedMotion ? undefined : stagger}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="mt-10 border-t border-[#e5def2]"
    >
      {details.map((item) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            variants={fadeUp}
            className="group flex items-center gap-4 border-b border-[#e5def2] py-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4effb] text-[#7352b6] transition-all duration-300 group-hover:bg-[#7352b6] group-hover:text-white">
              <Icon size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7352b6]">
                {item.label}
              </p>

              {item.href ? (
                <a
                  href={item.href}
                  className="mt-1 block truncate text-sm font-semibold text-[#29243a] transition-colors duration-300 hover:text-[#7352b6] sm:text-base"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 text-sm font-semibold text-[#29243a] sm:text-base">
                  {item.value}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function Field({
  label,
  error,
  children,
  className = '',
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-bold text-[#29243a]">
        {label}
      </label>

      {children}

      {error && (
        <motion.p
          initial={{
            opacity: 0,
            y: -4,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-1.5 text-xs font-medium text-red-600"
        >
          {error.message}
        </motion.p>
      )}
    </div>
  );
}

/* =========================================================
   CONTACT FORM
========================================================= */

function ContactForm({
  type,
  setType,
  reducedMotion,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      industry: '',
      requiredService: '',
      country: '',
      budget: '',
    },
  });

  useEffect(() => {
    setSubmitted(false);
  }, [type]);

  const onSubmit = async (data) => {
    if (submitting) return;

    setSubmitting(true);

    try {
      const response = await api.post('/inquiries', {
        ...data,
        type,
      });

      const reference =
        response?.data?.reference ||
        response?.data?.data?.reference ||
        response?.data?.inquiry?.reference ||
        null;

      reset();

      setSubmitted(true);

      toast.success(
        reference
          ? `Inquiry sent successfully. Reference: ${reference}`
          : 'Inquiry sent successfully.'
      );
    } catch (error) {
      console.error(
        'Contact inquiry submission failed:',
        error
      );

      toast.error(
        error?.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      variants={reducedMotion ? undefined : fadeRight}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="relative"
    >
      {/* FORM INTRO */}
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7352b6]">
          Send an inquiry
        </p>

        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#29243a] sm:text-4xl">
          Tell us how we can help.
        </h2>
      </div>

      {/* INQUIRY TABS */}
      <div className="mb-8 grid grid-cols-2 border-b border-[#e5def2]">
        {[
          {
            value: 'contact',
            label: 'General Inquiry',
          },
          {
            value: 'business',
            label: 'Business Inquiry',
          },
        ].map((option) => {
          const active = type === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setType(option.value)}
              className={`relative px-2 pb-4 text-left text-sm font-bold transition-colors duration-300 ${
                active
                  ? 'text-[#7352b6]'
                  : 'text-[#777181] hover:text-[#29243a]'
              }`}
            >
              {option.label}

              {active && (
                <motion.span
                  layoutId="contactInquiryTab"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#7352b6]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* SUCCESS MESSAGE */}
      {submitted && (
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-7 flex items-start gap-4 rounded-2xl border border-green-200 bg-green-50 p-5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <h3 className="font-bold text-green-900">
              Thank you for contacting us.
            </h3>

            <p className="mt-1 text-sm leading-6 text-green-800">
              Your inquiry has been received and our team will
              get back to you as soon as possible.
            </p>
          </div>
        </motion.div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        {/* NAME + EMAIL */}
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Full name *"
            error={errors.name}
          >
            <input
              {...register('name', {
                required: 'Full name is required.',
                minLength: {
                  value: 2,
                  message: 'Please enter your full name.',
                },
              })}
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              className="contact-input"
            />
          </Field>

          <Field
            label="Email address *"
            error={errors.email}
          >
            <input
              {...register('email', {
                required: 'Email address is required.',
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address.',
                },
              })}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="contact-input"
            />
          </Field>
        </div>

        {/* PHONE + COMPANY */}
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Phone number"
            error={errors.phone}
          >
            <input
              {...register('phone')}
              type="tel"
              placeholder="+977 ..."
              autoComplete="tel"
              className="contact-input"
            />
          </Field>

          <Field
            label="Company"
            error={errors.company}
          >
            <input
              {...register('company')}
              type="text"
              placeholder="Company name"
              autoComplete="organization"
              className="contact-input"
            />
          </Field>
        </div>

        {/* BUSINESS FIELDS */}
        {type === 'business' && (
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    height: 0,
                  }
            }
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            transition={{
              duration: 0.45,
              ease,
            }}
            className="space-y-6 overflow-hidden"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Industry"
                error={errors.industry}
              >
                <input
                  {...register('industry')}
                  type="text"
                  placeholder="Your industry"
                  className="contact-input"
                />
              </Field>

              <Field
                label="Required service"
                error={errors.requiredService}
              >
                <input
                  {...register('requiredService')}
                  type="text"
                  placeholder="Service you need"
                  className="contact-input"
                />
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Country"
                error={errors.country}
              >
                <input
                  {...register('country')}
                  type="text"
                  placeholder="Country"
                  autoComplete="country-name"
                  className="contact-input"
                />
              </Field>

              <Field
                label="Budget"
                error={errors.budget}
              >
                <input
                  {...register('budget')}
                  type="text"
                  placeholder="Estimated budget"
                  className="contact-input"
                />
              </Field>
            </div>
          </motion.div>
        )}

        {/* SUBJECT */}
        <Field
          label="Subject"
          error={errors.subject}
        >
          <input
            {...register('subject')}
            type="text"
            placeholder="What would you like to discuss?"
            className="contact-input"
          />
        </Field>

        {/* MESSAGE */}
        <Field
          label="Message *"
          error={errors.message}
        >
          <textarea
            {...register('message', {
              required: 'Message is required.',
              minLength: {
                value: 10,
                message:
                  'Please provide a little more detail.',
              },
            })}
            rows={7}
            placeholder="Tell us about your requirement..."
            className="contact-input resize-y"
          />
        </Field>

        {/* SUBMIT */}
        <div className="pt-1">
          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={
              reducedMotion || submitting
                ? undefined
                : {
                    y: -2,
                  }
            }
            whileTap={
              reducedMotion || submitting
                ? undefined
                : {
                    scale: 0.98,
                  }
            }
            className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#7352b6] px-7 text-sm font-bold text-white shadow-[0_12px_30px_rgba(111,82,173,0.2)] transition-colors duration-300 hover:bg-[#62439f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending...
              </>
            ) : (
              <>
                Send inquiry

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </>
            )}
          </motion.button>

          <p className="mt-4 text-xs leading-5 text-[#777181]">
            We'll review your message and get back to you as
            soon as possible.
          </p>
        </div>
      </form>
    </motion.div>
  );
}

/* =========================================================
   CONTACT PAGE
========================================================= */

export default function Contact() {
  const [type, setType] = useState('contact');

  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const pageProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.25,
  });

  return (
    <main className="overflow-hidden bg-[#FCFBFF] text-[#29243a]">
      {/* SEO */}

      <SEO
        title="Contact"
        description="Get in touch with OS Group of Company."
      />

      {/* =====================================================
          SCROLL PROGRESS
      ===================================================== */}

      {!reducedMotion && (
        <motion.div
          style={{
            scaleX: pageProgress,
          }}
          className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-[#7352b6]"
        />
      )}

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#eeeaf5] bg-white">
        <div className="container-page py-14 sm:py-18 lg:py-22">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

            {/* HERO COPY */}
            <motion.div
              variants={reducedMotion ? undefined : stagger}
              initial={reducedMotion ? false : 'hidden'}
              animate={reducedMotion ? undefined : 'visible'}
              className="relative z-10"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-[#e5def2] bg-[#f7f4fb] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#7352b6]"
              >
                <Sparkles size={13} />
                Get in touch
              </motion.div>

              <motion.h1
                variants={blurReveal}
                className="mt-6 max-w-3xl font-serif text-[clamp(3.4rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-[#29243a]"
              >
                Let's start
                <br />
                <span className="text-[#7352b6]">
                  a conversation.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-xl text-base leading-7 text-[#65616d] sm:text-lg"
              >
                Whether you have a business requirement, want to
                learn more about our services, or simply want to
                connect with our team, we're ready to listen.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-7"
              >
                <a
                  href="#contact-form"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-[#7352b6] transition-colors duration-300 hover:text-[#62439f]"
                >
                  Start your inquiry

                  <ArrowDown
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </a>
              </motion.div>
            </motion.div>

            {/* HERO IMAGE */}
            <ContactImage
              reducedMotion={reducedMotion}
            />
          </div>
        </div>

        {/* SOFT DECORATIVE LIGHT */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 -top-24 h-80 w-80 rounded-full bg-[#eee6fb] blur-3xl"
        />
      </section>

      {/* =====================================================
          CONTACT INTRO + FORM
      ===================================================== */}

      <section className="bg-[#FCFBFF] py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">

            {/* LEFT SIDE */}
            <motion.div
              variants={
                reducedMotion
                  ? undefined
                  : fadeLeft
              }
              initial={
                reducedMotion
                  ? false
                  : 'hidden'
              }
              whileInView={
                reducedMotion
                  ? undefined
                  : 'visible'
              }
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7352b6]">
                Contact OS Group
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#29243a] sm:text-5xl lg:text-6xl">
                One conversation
                <br />
                <span className="text-[#7352b6]">
                  can start something.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-[#65616d]">
                Share your requirement with us and our team will
                connect you with the right people and expertise
                across the group.
              </p>

              <ContactDetails
                reducedMotion={reducedMotion}
              />
            </motion.div>

            {/* RIGHT SIDE FORM */}
            <div
              id="contact-form"
              className="scroll-mt-28"
            >
              <ContactForm
                type={type}
                setType={setType}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SIMPLE PROCESS
      ===================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <motion.div
            variants={
              reducedMotion
                ? undefined
                : stagger
            }
            initial={
              reducedMotion
                ? false
                : 'hidden'
            }
            whileInView={
              reducedMotion
                ? undefined
                : 'visible'
            }
            viewport={{
              once: true,
              amount: 0.15,
            }}
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7352b6]">
                What happens next
              </p>

              <h2 className="mt-3 max-w-2xl font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#29243a] sm:text-5xl">
                Simple steps.
                <br />
                <span className="text-[#7352b6]">
                  Clear communication.
                </span>
              </h2>
            </motion.div>

            <div className="mt-10 grid gap-0 border-t border-[#e5def2] sm:grid-cols-3">
              {[
                {
                  number: '01',
                  title: 'Tell us',
                  text: 'Share your requirement, question or business need.',
                },
                {
                  number: '02',
                  title: 'We connect',
                  text: 'Our team reviews your message and identifies the right next step.',
                },
                {
                  number: '03',
                  title: 'Move forward',
                  text: 'We discuss the opportunity and work toward a clear solution.',
                },
              ].map((item) => (
                <motion.div
                  key={item.number}
                  variants={fadeUp}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          y: -5,
                        }
                  }
                  className="border-b border-[#e5def2] px-1 py-7 transition-transform duration-300 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
                >
                  <span className="font-serif text-4xl font-semibold text-[#d8caed]">
                    {item.number}
                  </span>

                  <h3 className="mt-5 text-lg font-bold text-[#29243a]">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#65616d]">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#f5f0fb] py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#e4d7f5] blur-3xl"
        />

        <div className="container-page relative z-10">
          <motion.div
            variants={
              reducedMotion
                ? undefined
                : fadeUp
            }
            initial={
              reducedMotion
                ? false
                : 'hidden'
            }
            whileInView={
              reducedMotion
                ? undefined
                : 'visible'
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="flex flex-col gap-7 rounded-[1.75rem] border border-[#e5def2] bg-white px-6 py-10 shadow-[0_18px_55px_rgba(87,67,130,0.07)] sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:px-14"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7352b6]">
                Ready when you are
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#29243a] sm:text-5xl">
                Have something
                <span className="text-[#7352b6]">
                  {' '}
                  in mind?
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#65616d] sm:text-base">
                Start the conversation and let us understand
                what you need.
              </p>
            </div>

            <a
              href="#contact-form"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-[#7352b6] px-6 text-sm font-bold text-white shadow-[0_12px_28px_rgba(111,82,173,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#62439f]"
            >
              Contact us

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}