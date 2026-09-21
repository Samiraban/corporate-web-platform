import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MoveUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import api from '../services/api';
import SEO from '../components/SEO';

const ease = [0.16, 1, 0.3, 1];

/*
|--------------------------------------------------------------------------
| NLCITS
|--------------------------------------------------------------------------
| This is the REAL existing company route.
| Do not change this to /companies/nlcits.
|--------------------------------------------------------------------------
*/
const NLCITS_SLUG = 'nepal-living-connecting-it-solution-pvt-ltd';

const NLCITS_NAME = 'Nepal Living Connecting IT Solution Pvt. Ltd';

const NLCITS_LOGO = '/images/nlcits-logo.png';

const FALLBACK_IMAGES = [
  '/company-slides/project-1.jpg',
  '/company-slides/project-2.jpg',
  '/company-slides/project-3.jpg',
  '/company-slides/project-4.jpg',
  '/images/os-group-project.jpg',
  '/images/os-group-office.jpg',
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 55,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

function getIndustryImage(industry, index) {
  return (
    industry?.image ||
    industry?.icon ||
    FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
  );
}

/*
|--------------------------------------------------------------------------
| Detect the real NLCITS company
|--------------------------------------------------------------------------
*/
function isNLCITS(company) {
  const slug = String(company?.slug || '').toLowerCase().trim();
  const name = String(company?.name || '').toLowerCase().trim();

  return (
    slug === NLCITS_SLUG ||
    slug === 'nlcits' ||
    name.includes('nepal living connecting it solution') ||
    name.includes('nepal living and connecting it solution') ||
    name === 'nlcits'
  );
}

/*
|--------------------------------------------------------------------------
| Industry Card
|--------------------------------------------------------------------------
*/
function IndustryCard({ industry, index }) {
  const image = getIndustryImage(industry, index);
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.14,
      }}
      transition={{
        delay: index * 0.07,
      }}
      className="group"
    >
      <Link
        to="/companies"
        className="relative block overflow-hidden rounded-[2rem] border border-[#e9dfd0] bg-[#fffdf9] shadow-[0_18px_60px_rgba(164,133,77,0.07)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#f4eee4]">
          <motion.img
            src={image}
            alt={industry.name || 'OS Group industry'}
            loading="lazy"
            initial={{
              scale: 1.04,
            }}
            whileInView={{
              scale: 1,
            }}
            whileHover={{
              scale: 1.07,
            }}
            transition={{
              duration: 1,
              ease,
            }}
            className="h-full w-full object-cover"
          />

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileHover={{
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
            }}
            className="absolute inset-0 bg-[#e7d4ad]/20"
          />

          <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/75 bg-white/82 font-serif text-sm font-semibold text-[#9d7838] shadow-sm backdrop-blur-sm">
            {number}
          </div>

          <motion.div
            whileHover={{
              rotate: 45,
              scale: 1.08,
            }}
            transition={{
              duration: 0.35,
              ease,
            }}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/75 bg-white/82 text-[#9d7838] shadow-sm backdrop-blur-sm"
          >
            <MoveUpRight size={18} />
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 to-transparent" />
        </div>

        <div className="relative p-7 sm:p-8">
          <motion.div
            animate={{
              width: [34, 58, 34],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-5 h-[3px] bg-[#c79a45]"
          />

          <h2 className="font-serif text-3xl font-semibold tracking-[-0.025em] text-[#6e675e] transition-colors duration-300 group-hover:text-[#9d7838] sm:text-4xl">
            {industry.name}
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#81796e] sm:text-base">
            {industry.description ||
              'Specialist expertise and dependable solutions supporting this sector through the OS Group network.'}
          </p>

          <div className="mt-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#9d7838]">
            Explore sector

            <motion.span
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </div>
        </div>

        <motion.div
          initial={{
            scaleX: 0,
          }}
          whileHover={{
            scaleX: 1,
          }}
          transition={{
            duration: 0.55,
            ease,
          }}
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-[#c79a45]"
        />
      </Link>
    </motion.article>
  );
}

/*
|--------------------------------------------------------------------------
| Company Card
|--------------------------------------------------------------------------
*/
function CompanyCard({ company, index }) {
  const nlcits = isNLCITS(company);

  /*
   * If the database does not have a logo for NLCITS,
   * use the local NLCITS logo.
   */
  const logo = nlcits
    ? company.logo || company.logoUrl || NLCITS_LOGO
    : company.logo || company.logoUrl;

  /*
   * Always use the REAL NLCITS slug.
   */
  const companySlug = nlcits
    ? NLCITS_SLUG
    : company.slug;

  const companyName = nlcits
    ? company.name || NLCITS_NAME
    : company.name;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease,
      }}
    >
      <Link
        to={`/companies/${companySlug}`}
        className="group relative block h-full overflow-hidden rounded-2xl border border-[#e9dfd0] bg-white p-7 shadow-[0_14px_45px_rgba(164,133,77,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-[#d6bb83] hover:shadow-[0_22px_60px_rgba(164,133,77,0.11)] sm:p-8"
      >
        <motion.div
          initial={{
            width: 0,
          }}
          whileHover={{
            width: '100%',
          }}
          transition={{
            duration: 0.55,
            ease,
          }}
          className="absolute left-0 top-0 h-[3px] bg-[#c79a45]"
        />

        <div className="flex h-14 items-center">
          {logo ? (
            <motion.img
              src={logo}
              alt={`${companyName} logo`}
              loading="lazy"
              className="h-full max-w-[210px] object-contain object-left"
              whileHover={{
                scale: 1.04,
              }}
              transition={{
                duration: 0.35,
                ease,
              }}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e8ddcd] bg-[#faf4e8]">
              <span className="font-serif text-xl text-[#b1843c]">
                {companyName?.charAt(0) || 'O'}
              </span>
            </div>
          )}
        </div>

        <h3 className="mt-7 font-serif text-2xl font-semibold text-[#6e675e] transition-colors duration-300 group-hover:text-[#9d7838]">
          {companyName}
        </h3>

        {company.tagline && (
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#81796e]">
            {company.tagline}
          </p>
        )}

        {!company.tagline && nlcits && (
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#81796e]">
            Technology, connectivity and digital solutions within the OS Group network.
          </p>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-[#eee7dc] pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9d9488]">
            View company
          </span>

          <motion.span
            whileHover={{
              x: 5,
            }}
            className="text-[#b1843c]"
          >
            <ArrowRight size={18} />
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}

/*
|--------------------------------------------------------------------------
| Industries Page
|--------------------------------------------------------------------------
*/
export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [industryResponse, companyResponse] = await Promise.all([
          api.get('/industries?status=published&limit=100&sort=order'),
          api.get('/companies?status=published&limit=100&sort=order'),
        ]);

        if (!mounted) return;

        const industryData =
          industryResponse?.data?.data ||
          industryResponse?.data ||
          [];

        const companyData =
          companyResponse?.data?.data ||
          companyResponse?.data ||
          [];

        setIndustries(
          Array.isArray(industryData)
            ? industryData
            : []
        );

        /*
         * Normalize companies.
         */
        let normalizedCompanies = Array.isArray(companyData)
          ? companyData
          : [];

        /*
         * Find the real NLCITS company.
         *
         * We do NOT create a fake company if it already exists.
         */
        const nlcitsCompany = normalizedCompanies.find(
          (company) => isNLCITS(company)
        );

        /*
         * Remove duplicate NLCITS records.
         *
         * Keep only the actual company record.
         */
        normalizedCompanies = normalizedCompanies.filter(
          (company, index, array) => {
            if (!isNLCITS(company)) {
              return true;
            }

            return (
              array.findIndex(
                (item) => isNLCITS(item)
              ) === index
            );
          }
        );

        /*
         * If the backend returned an NLCITS record,
         * make sure its logo is available.
         */
        if (nlcitsCompany) {
          normalizedCompanies = normalizedCompanies.map(
            (company) => {
              if (!isNLCITS(company)) {
                return company;
              }

              return {
                ...company,
                slug: NLCITS_SLUG,
                name: company.name || NLCITS_NAME,
                logo:
                  company.logo ||
                  company.logoUrl ||
                  NLCITS_LOGO,
              };
            }
          );
        }

        setCompanies(normalizedCompanies);
      } catch (error) {
        console.error(
          'Failed to load industries and companies:',
          error
        );

        if (mounted) {
          setIndustries([]);
          setCompanies([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="overflow-hidden bg-[#fffdf9] text-[#6e675e]">
      <SEO
        title="Industries We Serve"
        description="Explore the industries and sectors served by OS Group and its companies."
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f8f2e8] py-24 sm:py-32 lg:py-40">
        <motion.div
          animate={{
            x: [0, 25, -10, 0],
            y: [0, -18, 12, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#ead9b7]/45 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -18, 12, 0],
            y: [0, 20, -8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-28 left-[-70px] h-72 w-72 rounded-full bg-[#f0e3ca]/70 blur-3xl"
        />

        <div className="container-page relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
            <div>
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: 72,
                }}
                transition={{
                  duration: 0.9,
                  ease,
                }}
                className="mb-7 h-[3px] bg-[#c79a45]"
              />

              <motion.p
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease,
                }}
                className="text-xs font-bold uppercase tracking-[0.35em] text-[#a17a38]"
              >
                Our Business
              </motion.p>

              <div className="mt-5 overflow-hidden">
                <motion.h1
                  initial={{
                    y: '105%',
                  }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    duration: 1.05,
                    delay: 0.25,
                    ease,
                  }}
                  className="font-serif text-6xl font-semibold leading-[0.9] tracking-[-0.05em] text-[#6e675e] sm:text-7xl lg:text-[7.5rem]"
                >
                  Industries
                  <br />
                  <span className="text-[#b1843c]">
                    We Serve.
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.75,
                  ease,
                }}
                className="mt-8 max-w-2xl text-sm leading-7 text-[#81796e] sm:text-base"
              >
                OS Group companies operate across diverse industries,
                bringing specialist expertise, focused leadership and
                shared standards to every market we serve.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 1,
                  ease,
                }}
                className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#9d7838]"
              >
                <span>
                  Explore our sectors
                </span>

                <motion.span
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  ↓
                </motion.span>
              </motion.div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                x: 45,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 1.05,
                delay: 0.35,
                ease,
              }}
              className="relative"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-[#d9c59b]" />

              <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-[#ead9b7]/55" />

              <div className="relative overflow-hidden rounded-[2rem] border border-[#e5d9c7] bg-white p-2 shadow-[0_28px_80px_rgba(164,133,77,0.12)]">
                <motion.img
                  src="/images/os-group-global.jpg"
                  alt="OS Group global operations"
                  className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
                  animate={{
                    scale: [1, 1.025, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <div className="absolute bottom-7 left-7 rounded-2xl border border-white/70 bg-white/[0.88] px-5 py-4 shadow-lg backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a17a38]">
                    One group
                  </p>

                  <p className="mt-1 font-serif text-xl font-semibold text-[#6e675e]">
                    Many areas of expertise
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-white py-24 sm:py-32 lg:py-36">
        <div className="container-page">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="mb-14 max-w-3xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a17a38]">
              Sectors we operate across
            </p>

            <h2 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.04em] text-[#6e675e] sm:text-6xl">
              Expertise built around
              <br />
              <span className="text-[#b1843c]">
                real industries.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#81796e]">
              Explore the sectors where OS Group companies bring people,
              capability and practical experience together.
            </p>
          </motion.div>

          {loading && (
            <div className="grid gap-7 lg:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  animate={{
                    opacity: [0.45, 0.8, 0.45],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: item * 0.12,
                  }}
                  className="overflow-hidden rounded-[2rem] border border-[#eee7dc] bg-[#f8f2e8]"
                >
                  <div className="aspect-[16/10] bg-[#eee4d3]" />

                  <div className="p-8">
                    <div className="h-7 w-2/3 rounded bg-[#eee4d3]" />

                    <div className="mt-4 h-4 w-full rounded bg-[#f0e8dc]" />

                    <div className="mt-2 h-4 w-4/5 rounded bg-[#f0e8dc]" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && industries.length === 0 && (
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              className="flex min-h-[360px] items-center justify-center rounded-[2rem] border border-[#e9dfd0] bg-[#fffdf9] text-center"
            >
              <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#e9dfd0] bg-[#faf4e8]">
                  <Sparkles
                    size={26}
                    className="text-[#b1843c]"
                  />
                </div>

                <h3 className="mt-6 font-serif text-3xl text-[#6e675e]">
                  Industries coming soon
                </h3>

                <p className="mt-3 max-w-md text-sm leading-7 text-[#81796e]">
                  Our industry profiles will appear here once they are published.
                </p>
              </div>
            </motion.div>
          )}

          {!loading && industries.length > 0 && (
            <div className="grid gap-7 lg:grid-cols-2">
              {industries.map((industry, index) => (
                <IndustryCard
                  key={
                    industry._id ||
                    industry.slug ||
                    index
                  }
                  industry={industry}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* NLCITS TECHNOLOGY FEATURE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 28,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="mt-10 overflow-hidden rounded-[2rem] border border-[#e5ddf5] bg-[#faf8ff]"
          >
            <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[220px_1fr_auto] lg:p-10">
              <div className="flex min-h-[150px] items-center justify-center rounded-2xl border border-[#e8e1f5] bg-white p-6">
                <img
                  src={NLCITS_LOGO}
                  alt="Nepal Living Connecting IT Solution Pvt. Ltd"
                  className="h-28 w-28 object-contain sm:h-32 sm:w-32"
                  loading="lazy"
                />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#725ca8]">
                  Technology &amp; IT Solutions
                </p>

                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-[#172033] sm:text-3xl">
                  Nepal Living Connecting IT Solution Pvt. Ltd
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5b6575] sm:text-base">
                  NLCITS represents the OS Group technology and connectivity
                  capability, supporting digital solutions, IT services and
                  connected experiences.
                </p>
              </div>

              <Link
                to={`/companies/${NLCITS_SLUG}`}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#cfc3e8] bg-white px-5 text-sm font-bold text-[#5b4b8a] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9b86c7] hover:bg-[#f3effd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b72b6] focus-visible:ring-offset-2"
              >
                View NLCITS

                <ArrowRight
                  size={15}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMPANIES */}
      {!loading && companies.length > 0 && (
        <section className="bg-[#f8f2e8] py-24 sm:py-32">
          <div className="container-page">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="mb-14 max-w-3xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a17a38]">
                Who delivers it
              </p>

              <h2 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.03em] text-[#6e675e] sm:text-6xl">
                Companies behind
                <br />
                <span className="text-[#b1843c]">
                  these industries.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#81796e]">
                Discover the specialist companies within OS Group and the
                expertise they contribute to the wider network.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((company, index) => (
                <CompanyCard
                  key={
                    company._id ||
                    company.slug ||
                    index
                  }
                  company={company}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL STATEMENT */}
      <section className="relative overflow-hidden bg-[#fffdf9] py-28 sm:py-36">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -left-48 top-12 h-[520px] w-[520px] rounded-full border border-[#eadfce]"
        />

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -right-40 bottom-[-130px] h-[460px] w-[460px] rounded-full border border-[#eadfce]"
        />

        <div className="container-page relative z-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className="mx-auto max-w-5xl text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#a17a38]">
              One wider network
            </p>

            <h2 className="mt-6 font-serif text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#6e675e] sm:text-6xl lg:text-7xl">
              Different industries.
              <br />
              <span className="text-[#b1843c]">
                Connected expertise.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#81796e] sm:text-base">
              Specialist companies, focused knowledge and shared standards
              connected through one OS Group network.
            </p>

            <motion.div
              initial={{
                width: 0,
              }}
              whileInView={{
                width: 100,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1,
                delay: 0.35,
                ease,
              }}
              className="mx-auto mt-10 h-[3px] bg-[#c79a45]"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}